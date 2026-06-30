import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { icon } from "./icons.js";

const bookingsRef = collection(db, "bookings");

const monthLabel = document.getElementById("cal-month-label");
const grid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("cal-prev");
const nextBtn = document.getElementById("cal-next");
const dayPanel = document.getElementById("calendar-day-panel");

const addToggle = document.getElementById("cal-add-toggle");
const form = document.getElementById("booking-form");
const nameInput = document.getElementById("booking-name");
const startInput = document.getElementById("booking-start");
const endInput = document.getElementById("booking-end");
const peopleInput = document.getElementById("booking-people");
const roomsInput = document.getElementById("booking-rooms");
const warning = document.getElementById("booking-warning");

addToggle.innerHTML = `${icon("plus")}<span>Verblijf toevoegen</span>`;
prevBtn.innerHTML = icon("chevronLeft");
nextBtn.innerHTML = icon("chevronRight");

let bookings = [];
let viewDate = new Date();
viewDate.setDate(1);
let selectedDate = toISODate(new Date());

addToggle.addEventListener("click", () => {
  form.classList.toggle("open");
});

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function overlaps(start, end) {
  return bookings.some((b) => start <= b.end && end >= b.start);
}

function bookingsOnDay(dateStr) {
  return bookings.filter((b) => dateStr >= b.start && dateStr <= b.end);
}

startInput.addEventListener("change", checkOverlap);
endInput.addEventListener("change", checkOverlap);

function checkOverlap() {
  if (!startInput.value || !endInput.value) return;
  const hasOverlap = overlaps(startInput.value, endInput.value);
  warning.classList.toggle("hidden", !hasOverlap);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const start = startInput.value;
  const end = endInput.value;
  const people = parseInt(peopleInput.value, 10) || 1;
  const rooms = parseInt(roomsInput.value, 10) || 1;
  if (!name || !start || !end) return;
  await addDoc(bookingsRef, {
    name,
    start,
    end,
    people,
    rooms,
    createdAt: serverTimestamp(),
  });
  nameInput.value = "";
  startInput.value = "";
  endInput.value = "";
  peopleInput.value = "";
  roomsInput.value = "";
  warning.classList.add("hidden");
  form.classList.remove("open");
});

prevBtn.addEventListener("click", () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  renderGrid();
});

nextBtn.addEventListener("click", () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  renderGrid();
});

function renderGrid() {
  monthLabel.textContent = viewDate.toLocaleDateString("nl-NL", {
    month: "long",
    year: "numeric",
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  // Monday = 0 ... Sunday = 6
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = toISODate(new Date());

  grid.innerHTML = "";
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - firstWeekday + 1;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "cal-cell";

    if (dayNum < 1 || dayNum > daysInMonth) {
      cell.classList.add("empty");
      cell.disabled = true;
    } else {
      const date = new Date(year, month, dayNum);
      const dateStr = toISODate(date);
      const dayBookings = bookingsOnDay(dateStr);

      cell.innerHTML = `<span class="cal-daynum">${dayNum}</span>`;
      if (dayBookings.length) {
        const dots = document.createElement("span");
        dots.className = "cal-dots";
        dayBookings.slice(0, 3).forEach(() => {
          const dot = document.createElement("span");
          dot.className = "cal-dot";
          dots.appendChild(dot);
        });
        cell.appendChild(dots);
      }
      if (dateStr === todayStr) cell.classList.add("today");
      if (dateStr === selectedDate) cell.classList.add("selected");

      cell.addEventListener("click", () => {
        selectedDate = dateStr;
        renderGrid();
        renderDayPanel();
      });
    }
    grid.appendChild(cell);
  }
}

function renderDayPanel() {
  const date = new Date(selectedDate);
  const label = date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dayBookings = bookingsOnDay(selectedDate);

  dayPanel.innerHTML = `<h3>${label}</h3>`;
  if (!dayBookings.length) {
    dayPanel.innerHTML += `<p class="empty-hint">Nog geen verblijf gepland op deze dag.</p>`;
    return;
  }

  const list = document.createElement("ul");
  list.className = "item-list";
  dayBookings.forEach((b) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "item-text";
    span.innerHTML = `<strong>${b.name}</strong><br>
      <span class="item-meta">${b.start} → ${b.end} · ${b.people || 1} ${
      (b.people || 1) === 1 ? "persoon" : "personen"
    } · ${b.rooms || 1} ${(b.rooms || 1) === 1 ? "kamer" : "kamers"}</span>`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = icon("trash");
    delBtn.addEventListener("click", () => deleteDoc(doc(db, "bookings", b.id)));

    li.append(span, delBtn);
    list.appendChild(li);
  });
  dayPanel.appendChild(list);
}

onSnapshot(query(bookingsRef, orderBy("start", "asc")), (snapshot) => {
  bookings = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  renderGrid();
  renderDayPanel();
});

renderGrid();
renderDayPanel();
