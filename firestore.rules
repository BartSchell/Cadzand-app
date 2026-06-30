import { icon } from "./icons.js";

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
  const iconName = btn.dataset.icon;
  if (iconName) {
    btn.insertAdjacentHTML("afterbegin", icon(iconName));
  }

  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === `tab-${target}`);
    });
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  });
}
