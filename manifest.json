import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { icon } from "./icons.js";

const shoppingRef = collection(db, "shopping");
const form = document.getElementById("shopping-form");
const input = document.getElementById("shopping-input");
const list = document.getElementById("shopping-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  await addDoc(shoppingRef, { text, done: false, createdAt: serverTimestamp() });
  input.value = "";
});

onSnapshot(query(shoppingRef, orderBy("createdAt", "desc")), (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const item = docSnap.data();
    const li = document.createElement("li");
    li.className = item.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!item.done;
    checkbox.addEventListener("change", () => {
      updateDoc(doc(db, "shopping", docSnap.id), { done: checkbox.checked });
    });

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = item.text;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = icon("trash");
    delBtn.addEventListener("click", () => deleteDoc(doc(db, "shopping", docSnap.id)));

    li.append(checkbox, span, delBtn);
    list.appendChild(li);
  });
});
