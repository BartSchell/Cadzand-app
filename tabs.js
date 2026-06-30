// Small set of reusable outline icons (stroke="currentColor") used instead of emoji.
const wrap = (inner, viewBox = "0 0 24 24") =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const icons = {
  calendar: wrap(`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>`),
  cart: wrap(`<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2l2.2 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6"/>`),
  check: wrap(`<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 12.5l3 3 6-6.5"/>`),
  broom: wrap(`<path d="M19 3l-7 7"/><path d="M9 13l-6 6c-.5.5-.5 1.4 0 2 .5.5 1.5.5 2 0l6-6"/><path d="M9 13l3-7 6 3-6 4z"/>`),
  wind: wrap(`<path d="M3 8h9.5a2.5 2.5 0 1 0-2.4-3.2"/><path d="M3 13h13a2.7 2.7 0 1 1-2.6 3.4"/><path d="M3 18h7.5a2 2 0 1 1-1.9 2.6"/>`),
  info: wrap(`<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 11h1.5v5M10.5 16h3"/>`),
  trash: wrap(`<path d="M4 7h16"/><path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M10 11v6M14 11v6"/>`),
  plus: wrap(`<path d="M12 5v14M5 12h14"/>`),
  chevronLeft: wrap(`<path d="M15 5l-7 7 7 7"/>`),
  chevronRight: wrap(`<path d="M9 5l7 7-7 7"/>`),
  close: wrap(`<path d="M5 5l14 14M19 5L5 19"/>`),
  pencil: wrap(`<path d="M4 17.5L4 20h2.5L20 6.5 17.5 4 4 17.5z"/><path d="M14.5 6.5l3 3"/>`),
  wifi: wrap(`<path d="M2 9.5a15 15 0 0 1 20 0"/><path d="M5.5 13a10.5 10.5 0 0 1 13 0"/><path d="M9 16.5a6 6 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/>`),
  pin: wrap(`<path d="M12 21s-7-6.2-7-11.5A7 7 0 1 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>`),
  bolt: wrap(`<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>`),
  trophy: wrap(`<path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5"/><path d="M9 19h6M12 14v5"/>`),
  users: wrap(`<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17.5" cy="9.5" r="2.3"/><path d="M15.5 19a4.2 4.2 0 0 1 6 0"/>`),
  bed: wrap(`<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 18v2M21 18v2"/><path d="M3 13h18"/><path d="M6 13V9h5v4"/>`),
};

// WMO weather codes -> icon key + Dutch label.
export function weatherInfo(code) {
  if (code === 0) return { icon: "sun", label: "Helder" };
  if ([1, 2].includes(code)) return { icon: "cloudSun", label: "Lichtbewolkt" };
  if (code === 3) return { icon: "cloud", label: "Bewolkt" };
  if ([45, 48].includes(code)) return { icon: "fog", label: "Mist" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "drizzle", label: "Motregen" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "rain", label: "Regen" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "snow", label: "Sneeuw" };
  if ([95, 96, 99].includes(code)) return { icon: "storm", label: "Onweer" };
  return { icon: "cloud", label: "Bewolkt" };
}

const weatherWrap = (inner) =>
  `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const weatherIcons = {
  sun: weatherWrap(`<circle cx="24" cy="24" r="11" fill="#f4a93c"/><g stroke="#f4a93c" stroke-width="2.5" stroke-linecap="round"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9 9l4.2 4.2M34.8 34.8L39 39M39 9l-4.2 4.2M13.2 34.8L9 39"/></g>`),
  cloudSun: weatherWrap(`<circle cx="17" cy="18" r="8" fill="#f4a93c"/><path d="M11 32a8 8 0 1 1 3-15.6A10 10 0 0 1 33 22a6.5 6.5 0 0 1-1 13H12a7 7 0 0 1-1-13z" fill="#cfd8e3"/>`),
  cloud: weatherWrap(`<path d="M13 33a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 23a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#aeb9c7"/>`),
  fog: weatherWrap(`<path d="M13 26a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 16a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#c7ccd1"/><g stroke="#8f97a0" stroke-width="2.5" stroke-linecap="round"><path d="M8 36h32M12 41h24"/></g>`),
  drizzle: weatherWrap(`<path d="M13 24a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 14a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#aeb9c7"/><g stroke="#5a8fd6" stroke-width="2.5" stroke-linecap="round"><path d="M16 33v4M24 33v4M32 33v4"/></g>`),
  rain: weatherWrap(`<path d="M13 22a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 12a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#8b97a6"/><g stroke="#3f6fbf" stroke-width="2.6" stroke-linecap="round"><path d="M14 32l-3 7M23 32l-3 7M32 32l-3 7"/></g>`),
  snow: weatherWrap(`<path d="M13 22a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 12a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#c7ccd1"/><g stroke="#7ea0c9" stroke-width="2.2" stroke-linecap="round"><path d="M16 32v8M12 36h8M24 32v8M20 36h8M32 32v8M28 36h8"/></g>`),
  storm: weatherWrap(`<path d="M13 20a8 8 0 1 1 2.7-15.5A10 10 0 0 1 35 10a6.5 6.5 0 0 1-1 13H14a7 7 0 0 1-1-13z" fill="#7c8896"/><path d="M25 26l-6 10h5l-3 8 9-11h-5z" fill="#f4a93c"/>`),
};

export function icon(name, cls = "") {
  return `<span class="icon ${cls}">${icons[name] || ""}</span>`;
}

export function weatherIconSvg(name, cls = "") {
  return `<span class="weather-icon ${cls}">${weatherIcons[name] || weatherIcons.cloud}</span>`;
}
