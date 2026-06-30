import { weatherIconSvg, weatherInfo, icon } from "./icons.js";

const LAT = 51.3878;
const LON = 3.4317;

const nowCard = document.getElementById("weather-now");
const kiteEl = document.getElementById("kite-status");
const hourlyEl = document.getElementById("wind-forecast");
const dailyEl = document.getElementById("weather-daily");

const directions = ["N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO", "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW"];

function degToCompass(deg) {
  return directions[Math.round(deg / 22.5) % 16];
}

// Cadzand-Bad's beach faces roughly north onto the North Sea.
// Onshore/cross winds (NW through NE) push you toward the beach and are safest.
// Wind from the south (offshore) can blow a kiter out to sea - avoid.
function isOffshore(deg) {
  return deg > 135 && deg < 225;
}

function classifyKite(speedKn, deg) {
  if (isOffshore(deg)) {
    return { level: "poor", label: "Niet veilig — aflandige wind", icon: "bolt" };
  }
  if (speedKn < 10) {
    return { level: "poor", label: "Te weinig wind om te kiten", icon: "wind" };
  }
  if (speedKn < 14) {
    return { level: "maybe", label: "Licht — groot kite nodig", icon: "wind" };
  }
  if (speedKn <= 30) {
    return { level: "good", label: "Top kite-conditie!", icon: "wind" };
  }
  if (speedKn <= 38) {
    return { level: "maybe", label: "Stevig — alleen gevorderden", icon: "wind" };
  }
  return { level: "poor", label: "Te sterk / gevaarlijk", icon: "bolt" };
}

const dayNames = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

async function loadWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,windspeed_10m,winddirection_10m,windgusts_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=kn&timezone=auto`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const current = data.current_weather;
    const hourly = data.hourly;
    const daily = data.daily;

    const nowIndex = Math.max(0, hourly.time.findIndex((t) => t === current.time));
    const wInfo = weatherInfo(hourly.weathercode[nowIndex] ?? 0);

    nowCard.innerHTML = `
      <div class="now-top">
        <div>
          <div class="now-place">Cadzand-Bad</div>
          <div class="now-temp">${Math.round(current.temperature)}°</div>
          <div class="now-desc">${wInfo.label}</div>
        </div>
        ${weatherIconSvg(wInfo.icon, "now-icon")}
      </div>
      <div class="now-wind">${icon("wind", "inline-icon")} ${current.windspeed} kn uit het ${degToCompass(current.winddirection)}</div>
    `;

    const kite = classifyKite(current.windspeed, current.winddirection);
    kiteEl.className = `kite-card ${kite.level}`;
    kiteEl.innerHTML = `${icon(kite.icon, "kite-icon")}
      <div>
        <strong>${kite.label}</strong><br>
        <span class="item-meta">${current.windspeed} kn, ${degToCompass(current.winddirection)}</span>
      </div>`;

    hourlyEl.innerHTML = "";
    for (let i = nowIndex; i < nowIndex + 12 && i < hourly.time.length; i++) {
      const hour = new Date(hourly.time[i]).getHours();
      const speed = hourly.windspeed_10m[i];
      const dir = hourly.winddirection_10m[i];
      const kiteHour = classifyKite(speed, dir);
      const div = document.createElement("div");
      div.className = `wind-hour ${kiteHour.level}`;
      div.innerHTML = `
        <div>${hour}:00</div>
        ${icon(kiteHour.icon, "small-icon")}
        <div>${speed} kn</div>
        <div>${degToCompass(dir)}</div>
      `;
      hourlyEl.appendChild(div);
    }

    dailyEl.innerHTML = "";
    for (let i = 0; i < daily.time.length && i < 5; i++) {
      const date = new Date(daily.time[i]);
      const label = i === 0 ? "Vandaag" : dayNames[date.getDay()];
      const info = weatherInfo(daily.weathercode[i]);
      const row = document.createElement("div");
      row.className = "day-row";
      row.innerHTML = `
        <span class="day-name">${label}</span>
        ${weatherIconSvg(info.icon, "day-icon")}
        <span class="day-wind">${Math.round(daily.windspeed_10m_max[i])} kn ${degToCompass(daily.winddirection_10m_dominant[i])}</span>
        <span class="day-temps"><strong>${Math.round(daily.temperature_2m_max[i])}°</strong> ${Math.round(daily.temperature_2m_min[i])}°</span>
      `;
      dailyEl.appendChild(row);
    }
  } catch (err) {
    nowCard.textContent = "Kon het weer niet laden. Controleer je internetverbinding.";
    kiteEl.textContent = "";
    console.error(err);
  }
}

loadWeather();
