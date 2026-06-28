const LAT = 51.3878;
const LON = 3.4317;

const currentEl = document.getElementById("weather-current");
const kiteEl = document.getElementById("kite-status");
const forecastEl = document.getElementById("wind-forecast");

const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

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
    return { level: "poor", label: "Not safe — offshore wind", icon: "⛔" };
  }
  if (speedKn < 10) {
    return { level: "poor", label: "Too light to kite", icon: "😴" };
  }
  if (speedKn < 14) {
    return { level: "maybe", label: "Light — big kite needed", icon: "🤔" };
  }
  if (speedKn <= 30) {
    return { level: "good", label: "Great kite conditions!", icon: "🪁" };
  }
  if (speedKn <= 38) {
    return { level: "maybe", label: "Strong — advanced riders only", icon: "💨" };
  }
  return { level: "poor", label: "Too strong / dangerous", icon: "⛔" };
}

async function loadWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,windspeed_10m,winddirection_10m,windgusts_10m&windspeed_unit=kn&timezone=auto`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const current = data.current_weather;
    currentEl.innerHTML = `
      <strong>${current.temperature}°C</strong><br>
      Wind: ${current.windspeed} kn from ${degToCompass(current.winddirection)} (${current.winddirection}°)
    `;

    const kite = classifyKite(current.windspeed, current.winddirection);
    kiteEl.className = `kite-card ${kite.level}`;
    kiteEl.innerHTML = `<strong>${kite.icon} ${kite.label}</strong><br>
      Wind ${current.windspeed} kn, ${degToCompass(current.winddirection)}`;

    const hourly = data.hourly;
    const nowIndex = hourly.time.findIndex((t) => t === current.time) || 0;
    forecastEl.innerHTML = "";
    for (let i = nowIndex; i < nowIndex + 24 && i < hourly.time.length; i++) {
      const hour = new Date(hourly.time[i]).getHours();
      const speed = hourly.windspeed_10m[i];
      const dir = hourly.winddirection_10m[i];
      const kiteHour = classifyKite(speed, dir);
      const div = document.createElement("div");
      div.className = "wind-hour";
      div.innerHTML = `
        <div>${hour}:00</div>
        <div>${kiteHour.icon}</div>
        <div>${speed} kn</div>
        <div>${degToCompass(dir)}</div>
      `;
      forecastEl.appendChild(div);
    }
  } catch (err) {
    currentEl.textContent = "Could not load weather. Check your connection.";
    kiteEl.textContent = "";
    console.error(err);
  }
}

loadWeather();
