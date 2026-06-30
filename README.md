# De Remise

Een app voor het vakantiehuis aan de Prinsestraat 22 in Cadzand. Iedereen in de familie kan de app openen op zijn/haar telefoon om de kalender, boodschappenlijst, to-do lijst, schoonmaakrooster, het weer/windvoorspelling en huisinfo (wifi, etc.) te bekijken.

Dit README is geschreven voor Bart, die nieuw is met programmeren. Loop het stap voor stap door — neem de tijd, en het is helemaal prima om met vragen terug te gaan naar Claude Code.

## Wat er al gebouwd is

- `index.html` — het skelet van de app (de tabs die je ziet: Kalender, Boodschappen, To-do, Schoonmaak, Weer, Info)
- `css/styles.css` — de styling (kleuren, ruimte, hoe dingen eruitzien)
- `js/` — de logica (één bestand per functie)
- `manifest.json` + `sw.js` — wat de app installeerbaar maakt op een homescreen (een "PWA")

Alles werkt, **behalve** dat de app nog niet weet bij welk Firebase-project de gegevens opgeslagen moeten worden. Als dat al is ingesteld (zoals bij de vorige versie van deze app), hoef je dit niet opnieuw te doen — `js/firebase-config.js` blijft ongewijzigd.

## Stap 1: Firebase project (indien nog niet gedaan)

1. Ga naar https://console.firebase.google.com en log in met je Google-account.
2. Klik op **"Add project"**, geef het een naam, en maak het aan (Google Analytics kan je overslaan).
3. Klik op het **"</>"** (web) icoon om een webapp toe te voegen. Geef het een bijnaam en klik op **Register app**.
4. Kopieer de `firebaseConfig` waarden naar `js/firebase-config.js` in dit project.

## Stap 2: Firestore (de gedeelde database)

1. In de Firebase Console, klik op **Build → Firestore Database**.
2. Klik op **Create database**, kies een locatie dichtbij (bijv. `europe-west`), en start in **test mode**.
3. Ga naar de **Rules** tab en plak de inhoud van `firestore.rules` uit dit project, klik daarna op **Publish**.

   Dit maakt de database open voor iedereen met de app-link — prima voor een kleine, besloten familie-app.

## Stap 3: Deployen naar Netlify

1. Push dit project naar je GitHub repository.
2. Ga naar https://app.netlify.com en log in (kan met GitHub).
3. Klik op **Add new site → Import an existing project**, kies GitHub, selecteer deze repository.
4. Kies de juiste branch, laat de build-instellingen leeg (geen build-stap nodig) en klik op **Deploy**.
5. Netlify geeft je een URL zoals `https://de-remise.netlify.app`. Dat is de link om met de familie te delen!

Elke keer dat nieuwe code naar GitHub wordt gepusht, deployt Netlify automatisch opnieuw.

## Stap 4: Installeren op je telefoon

1. Open de Netlify-URL op je telefoon in Safari (iPhone) of Chrome (Android).
2. iPhone: tik op het deel-icoon → "Zet op beginscherm" ("Add to Home Screen").
   Android: tik op het menu (⋮) → "Toevoegen aan startscherm" / "App installeren".
3. Je hebt nu een "De Remise" icoon op je homescreen, net als elke andere app!

## Hoe de functies werken

- **Kalender** — een echte maandweergave. Tik op een dag om te zien wie er verblijft, of tik op "Verblijf toevoegen" om je naam, aankomst/vertrek, aantal personen en aantal kamers (max 4) toe te voegen. Bij overlap met een ander verblijf verschijnt een waarschuwing.
- **Boodschappen** — items toevoegen, aanvinken als gekocht, verwijderen als het niet meer nodig is.
- **To-do lijst** — huistaken toevoegen, optioneel toewijzen aan een familielid, afvinken als het klaar is.
- **Schoonmaakrooster** — loggen wie wanneer heeft schoongemaakt en wat er is gedaan. Er is een klassement (wie het vaakst heeft schoongemaakt) en een volledige geschiedenis.
- **Weer & Wind** — actueel weer en een 5-daagse vooruitblik via de gratis [Open-Meteo](https://open-meteo.com) API (geen account of API-key nodig), plus een uurlijkse windvoorspelling met kite-conditie:
  - Top conditie — wind 14–30 knopen, schuin/op de kust aanwakkerend
  - Misschien — te licht (10–14 kn) of stevig (30–38 kn), goed opletten
  - Niet veilig — wind onder 10 kn (te weinig), boven 38 kn, of aflandige wind (zuidelijke richting, die je de zee op kan blazen)

  Dit is een richtlijn, geen vervanging voor het zelf checken van de echte omstandigheden op het strand.
- **Info Prinsestraat 22** — wifi naam/wachtwoord, adres, locatie stoppenkast/hoofdkraan, vuilnisdag, noodnummers en in-/uitchecknotities. Tik op het potlood-icoon om te bewerken; iedereen die de app gebruikt ziet de update direct.

## Notities voor toekomstige aanpassingen

- Gedeelde data staat in Firestore collections: `bookings`, `shopping`, `todos`, `cleaning`, `info`.
- Er is geen inlogsysteem — iedereen deelt dezelfde data, herkenbaar aan de naam die ze invoeren. Dat houdt het simpel voor een kleine familiegroep.
- De app werkt offline voor het app-skelet (dankzij de service worker), maar live data (kalender, lijsten, weer) heeft internet nodig om te laden en te synchroniseren.
