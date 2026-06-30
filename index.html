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

const cleaningRef = collection(db, "cleaning");
const form = document.getElementById("cleaning-form");
const nameInput = document.getElementById("cleaning-name");
const dateInput = document.getElementById("cleaning-date");
const notesInput = document.getElementById("cleaning-notes");
const history = document.getElementById("cleaning-history");
const leaderboard = document.getElementById("cleaning-leaderboard");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const date = dateInput.value;
  if (!name || !date) return;
  await addDoc(cleaningRef, {
    name,
    date,
    notes: notesInput.value.trim(),
    createdAt: serverTimestamp(),
  });
  nameInput.value = "";
  dateInput.value = "";
  notesInput.value = "";
});

onSnapshot(query(cleaningRef, orderBy("date", "desc")), (snapshot) => {
  history.innerHTML = "";
  const counts = {};

  snapshot.forEach((docSnap) => {
    const entry = docSnap.data();
    counts[entry.name] = (counts[entry.name] || 0) + 1;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "item-text";
    span.innerHTML = `<strong>${entry.name}</strong> &mdash; ${entry.date}` +
      (entry.notes ? `<br><span class="item-meta">${entry.notes}</span>` : "");

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = icon("trash");
    delBtn.addEventListener("click", () => deleteDoc(doc(db, "cleaning", docSnap.id)));

    li.append(span, delBtn);
    history.appendChild(li);
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  leaderboard.innerHTML = "";
  sorted.forEach(([name, count], i) => {
    const li = document.createElement("li");
    const rank = document.createElement("span");
    rank.className = "rank-badge";
    rank.textContent = i + 1;
    if (i === 0) rank.classList.add("rank-1");
    else if (i === 1) rank.classList.add("rank-2");
    else if (i === 2) rank.classList.add("rank-3");

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = `${name} — ${count}x`;

    li.append(rank, span);
    leaderboard.appendChild(li);
  });
});
