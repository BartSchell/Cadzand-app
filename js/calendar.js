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

const bookingsRef = collection(db, "bookings");
const form = document.getElementById("booking-form");
const nameInput = document.getElementById("booking-name");
const startInput = document.getElementById("booking-start");
const endInput = document.getElementById("booking-end");
const list = document.getElementById("booking-list");
const warning = document.getElementById("booking-warning");

let bookings = [];

function overlaps(start, end) {
  return bookings.some((b) => start <= b.end && end >= b.start);
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
  if (!name || !start || !end) return;
  await addDoc(bookingsRef, { name, start, end, createdAt: serverTimestamp() });
  nameInput.value = "";
  startInput.value = "";
  endInput.value = "";
  warning.classList.add("hidden");
});

onSnapshot(query(bookingsRef, orderBy("start", "asc")), (snapshot) => {
  bookings = [];
  list.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const b = docSnap.data();
    bookings.push(b);

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "item-text";
    span.innerHTML = `<strong>${b.name}</strong><br><span class="item-meta">${b.start} → ${b.end}</span>`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => deleteDoc(doc(db, "bookings", docSnap.id)));

    li.append(span, delBtn);
    list.appendChild(li);
  });
});
