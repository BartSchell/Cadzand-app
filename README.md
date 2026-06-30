<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>De Remise</title>
  <meta name="description" content="App voor het vakantiehuis aan de Prinsestraat 22 in Cadzand" />
  <meta name="theme-color" content="#5b32ad" />

  <link rel="manifest" href="manifest.json" />
  <link rel="apple-touch-icon" href="icons/icon.svg" />
  <link rel="icon" href="icons/icon.svg" />

  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>

  <header class="app-header">
    <h1>De Remise</h1>
  </header>

  <main id="app">

    <!-- CALENDAR TAB -->
    <section id="tab-calendar" class="tab-panel active">
      <h2>Kalender</h2>

      <div class="calendar-nav">
        <button type="button" id="cal-prev" class="icon-btn" aria-label="Vorige maand"></button>
        <span id="cal-month-label"></span>
        <button type="button" id="cal-next" class="icon-btn" aria-label="Volgende maand"></button>
      </div>

      <div class="cal-weekdays">
        <span>ma</span><span>di</span><span>wo</span><span>do</span><span>vr</span><span>za</span><span>zo</span>
      </div>
      <div id="calendar-grid" class="cal-grid"></div>

      <div id="calendar-day-panel" class="day-panel"></div>

      <button type="button" id="cal-add-toggle" class="add-toggle"></button>

      <form id="booking-form" class="card-form">
        <input type="text" id="booking-name" placeholder="Jouw naam" required />
        <label>Aankomst <input type="date" id="booking-start" required /></label>
        <label>Vertrek <input type="date" id="booking-end" required /></label>
        <label>Aantal personen <input type="number" id="booking-people" min="1" max="20" placeholder="bijv. 4" /></label>
        <label>Aantal kamers (max 4) <input type="number" id="booking-rooms" min="1" max="4" placeholder="bijv. 2" /></label>
        <button type="submit">Verblijf boeken</button>
      </form>
      <div id="booking-warning" class="warning hidden">Let op: dit overlapt met een ander verblijf!</div>
    </section>

    <!-- SHOPPING TAB -->
    <section id="tab-shopping" class="tab-panel">
      <h2>Boodschappen</h2>
      <form id="shopping-form" class="card-form">
        <input type="text" id="shopping-input" placeholder="Iets toevoegen..." required />
        <button type="submit">Toevoegen</button>
      </form>
      <ul id="shopping-list" class="item-list checklist"></ul>
    </section>

    <!-- TODO TAB -->
    <section id="tab-todo" class="tab-panel">
      <h2>To-do lijst</h2>
      <form id="todo-form" class="card-form">
        <input type="text" id="todo-input" placeholder="Wat moet er gebeuren?" required />
        <input type="text" id="todo-assignee" placeholder="Toewijzen aan (optioneel)" />
        <button type="submit">Toevoegen</button>
      </form>
      <ul id="todo-list" class="item-list checklist"></ul>
    </section>

    <!-- CLEANING TAB -->
    <section id="tab-cleaning" class="tab-panel">
      <h2>Schoonmaakrooster</h2>
      <form id="cleaning-form" class="card-form">
        <input type="text" id="cleaning-name" placeholder="Wie heeft schoongemaakt?" required />
        <input type="date" id="cleaning-date" required />
        <input type="text" id="cleaning-notes" placeholder="Wat is er gedaan? (optioneel)" />
        <button type="submit">Toevoegen</button>
      </form>

      <h3>Klassement</h3>
      <ol id="cleaning-leaderboard" class="item-list"></ol>

      <h3>Geschiedenis</h3>
      <ul id="cleaning-history" class="item-list"></ul>
    </section>

    <!-- WEATHER TAB -->
    <section id="tab-weather" class="tab-panel">
      <h2>Weer &amp; Wind</h2>
      <div id="weather-now" class="now-card">Weer laden...</div>
      <div id="kite-status" class="kite-card">Kitecondities controleren...</div>

      <h3>Komende uren</h3>
      <div id="wind-forecast" class="wind-forecast"></div>

      <h3>5-daagse verwachting</h3>
      <div id="weather-daily" class="daily-list"></div>
    </section>

    <!-- INFO TAB -->
    <section id="tab-info" class="tab-panel">
      <div class="info-header">
        <h2>Info Prinsestraat 22</h2>
        <button type="button" id="info-edit-btn" class="icon-btn" aria-label="Bewerken"></button>
      </div>
      <div id="info-view" class="info-view"></div>
      <form id="info-form" class="card-form"></form>
    </section>

  </main>

  <nav class="tab-bar">
    <button class="tab-btn active" data-tab="calendar" data-icon="calendar"><span>Kalender</span></button>
    <button class="tab-btn" data-tab="shopping" data-icon="cart"><span>Boodschappen</span></button>
    <button class="tab-btn" data-tab="todo" data-icon="check"><span>To-do</span></button>
    <button class="tab-btn" data-tab="cleaning" data-icon="broom"><span>Schoonmaak</span></button>
    <button class="tab-btn" data-tab="weather" data-icon="wind"><span>Weer</span></button>
    <button class="tab-btn" data-tab="info" data-icon="info"><span>Info</span></button>
  </nav>

  <script type="module" src="js/tabs.js"></script>
  <script type="module" src="js/shopping.js"></script>
  <script type="module" src="js/todo.js"></script>
  <script type="module" src="js/cleaning.js"></script>
  <script type="module" src="js/calendar.js"></script>
  <script type="module" src="js/weather.js"></script>
  <script type="module" src="js/info.js"></script>
</body>
</html>
