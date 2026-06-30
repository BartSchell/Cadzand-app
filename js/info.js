import { db } from "./firebase-config.js";
import {
  doc,
  onSnapshot,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { icon } from "./icons.js";

const infoDoc = doc(db, "info", "main");

const view = document.getElementById("info-view");
const editBtn = document.getElementById("info-edit-btn");
const form = document.getElementById("info-form");

const fields = [
  { key: "adres", label: "Adres", icon: "pin", placeholder: "Prinsestraat 22, Cadzand" },
  { key: "wifiNaam", label: "Wifi naam", icon: "wifi", placeholder: "Naam van het netwerk" },
  { key: "wifiWachtwoord", label: "Wifi wachtwoord", icon: "wifi", placeholder: "Wachtwoord" },
  { key: "stoppenkast", label: "Stoppenkast / hoofdkraan water", icon: "bolt", placeholder: "Locatie" },
  { key: "vuilnis", label: "Vuilnis ophalen", icon: "trash", placeholder: "Welke dag(en)" },
  { key: "nood", label: "Noodnummers / contact", icon: "info", placeholder: "Telefoonnummers" },
  { key: "opmerkingen", label: "In- en uitchecken", icon: "bed", placeholder: "Bijv. inchecken vanaf 15:00" },
];

editBtn.innerHTML = icon("pencil");

form.innerHTML =
  fields
    .map(
      (f) => `
    <label>${f.label}
      <input type="text" id="info-${f.key}" placeholder="${f.placeholder}" />
    </label>`
    )
    .join("") +
  `<button type="submit">Opslaan</button>`;

let current = {};

editBtn.addEventListener("click", () => {
  fields.forEach((f) => {
    document.getElementById(`info-${f.key}`).value = current[f.key] || "";
  });
  form.classList.toggle("open");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {};
  fields.forEach((f) => {
    data[f.key] = document.getElementById(`info-${f.key}`).value.trim();
  });
  await setDoc(infoDoc, data, { merge: true });
  form.classList.remove("open");
});

onSnapshot(infoDoc, (snap) => {
  current = snap.exists() ? snap.data() : {};
  view.innerHTML = fields
    .map((f) => {
      const value = current[f.key];
      if (!value) return "";
      return `<div class="info-row">
        ${icon(f.icon)}
        <div><span class="info-label">${f.label}</span><br>${value}</div>
      </div>`;
    })
    .join("");

  if (!view.innerHTML) {
    view.innerHTML = `<p class="empty-hint">Nog geen huisinfo ingevuld. Tik op het potlood om te beginnen.</p>`;
  }
});
