# 🏖️ Cadzand Huisje

A simple app for the family vacation home in Cadzand. Everyone in the family can open it on their phone to see the calendar, shopping list, to-do list, cleaning schedule, and the wind forecast for kitesurfing.

This README is written for Bart, who is brand new to coding. Go through it step by step — don't rush, and it's totally fine to come back to Claude Code with questions at any point.

## What's already built

- `index.html` — the skeleton of the app (the tabs you see: Calendar, Shopping, To-Do, Cleaning, Weather)
- `css/styles.css` — the paint job (colors, spacing, how things look)
- `js/` — the brains (one file per feature)
- `manifest.json` + `sw.js` — what makes this installable on a phone home screen (a "PWA")

Everything works, **except** the app doesn't yet know which Firebase project to save data to. That's the one thing left to set up — steps below.

## Step 1: Create a free Firebase project

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. Click **"Add project"**, name it something like `cadzand-huisje`, and create it (you can skip Google Analytics).
3. Once the project opens, click the **"</>"** (web) icon to add a web app. Give it a nickname like "Cadzand App" and click **Register app**.
4. Firebase will show you a code block that looks like this:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "cadzand-huisje.firebaseapp.com",
     projectId: "cadzand-huisje",
     storageBucket: "cadzand-huisje.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef",
   };
   ```

5. Copy those values into `js/firebase-config.js` in this project, replacing the `"REPLACE_ME"` placeholders.

## Step 2: Turn on Firestore (the shared database)

1. In the Firebase Console sidebar, click **Build → Firestore Database**.
2. Click **Create database**, choose a location close to you (e.g. `europe-west`), and start in **test mode** for now.
3. Once created, go to the **Rules** tab and paste in the contents of `firestore.rules` from this project, then click **Publish**.

   This makes the database open to anyone with the app link — perfectly fine since you're only sharing the link with family.

That's it for Firebase! The Calendar, Shopping List, To-Do List, and Cleaning Schedule will now save and sync automatically for everyone using the app.

## Step 3: Deploy to Netlify

1. Push this project to your GitHub repository (Claude Code can do this for you).
2. Go to https://app.netlify.com and sign in (you can sign in with GitHub).
3. Click **Add new site → Import an existing project**, choose GitHub, and select this repository.
4. Leave the build settings empty (there's no build step — it's plain HTML/CSS/JS) and click **Deploy**.
5. Netlify gives you a URL like `https://cadzand-huisje.netlify.app`. That's the link to share with family!

Every time new code is pushed to GitHub, Netlify will automatically redeploy the site.

## Step 4: Install it on your phone

1. Open the Netlify URL on your phone in Safari (iPhone) or Chrome (Android).
2. iPhone: tap the Share icon → "Add to Home Screen".
   Android: tap the menu (⋮) → "Add to Home screen" / "Install app".
3. You'll now have a Cadzand Huisje icon on your home screen like any other app!

## How the features work

- **Calendar** — anyone can add their stay (name + arrival/departure date). If a new booking overlaps an existing one, a warning appears so you can coordinate.
- **Shopping List** — add items, check them off when bought. Anyone can delete an item once it's no longer needed.
- **To-Do List** — add house tasks, optionally assign them to a family member, check off when done.
- **Cleaning Schedule** — log who cleaned, when, and what they did. There's a leaderboard showing who has cleaned the most (for friendly bragging rights 🏆) and a full history below it.
- **Weather & Wind** — pulls live weather and a 24-hour wind forecast for Cadzand from the free [Open-Meteo](https://open-meteo.com) API (no signup or API key needed). It also flags kite conditions:
  - 🪁 **Great** — wind 14–30 knots, blowing onshore/cross-shore
  - 🤔 **Maybe** — too light (10–14 kn) or strong (30–38 kn), or check carefully
  - ⛔ **Not safe** — wind under 10 kn (too light), over 38 kn, or blowing offshore (south-ish, which can carry a kiter out to sea)

  This is a simple guideline, not a substitute for checking real conditions and your own judgement on the beach.

## Notes for future changes

- All shared data lives in Firestore collections: `bookings`, `shopping`, `todos`, `cleaning`.
- There's no login system yet — everyone shares the same data, identified only by the name they type in. That keeps things simple for a small family group. If you ever want named accounts, Firebase Authentication can be added later.
- The app works offline for viewing the app shell (thanks to the service worker), but live data (calendar, lists, weather) needs an internet connection to load and sync.
