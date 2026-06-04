# Kirkenes Haus

Lebende Projektdokumentation für die Vermietungs-Website **„Arctic Lodge“** (sichtbarer Markenname, seit 04.06.2026; zuvor „Lodge in der Arktis“) – Projektordner weiterhin `Kirkenes Haus`; Objekt in Sør-Varanger bei Kirkenes, Norwegen.

## Repository & Live-Website

- **GitHub:** https://github.com/spassigxD/lodge-in-der-arktis
- **GitHub Pages:** https://spassigxD.github.io/lodge-in-der-arktis/ (nach Push kann die erste Veröffentlichung 1–2 Minuten dauern)

Statische Site im Repository-Root (`index.html`, relative Asset-Pfade). Galerie lädt `assets/airbnb/gallery-data.js` per HTTPS wie auf einem lokalen `python3 -m http.server`.

**Externe Abhängigkeiten (CDN, kein Build-System):** Google Fonts (Typografie), **Web3Forms** (`fetch`-POST an `https://api.web3forms.com/submit` für die Owner-Benachrichtigung) und **EmailJS Browser-SDK v4** (`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`, in `index.html` vor `script.js` geladen) für die automatische, mehrsprachige Bestätigungs-E-Mail an die anfragende Person.

**Git-Ausschlüsse:** `.cursor/`, `assets/kirkenes_bilder_plaene.zip` (Duplikat zum entpackten Archiv unter `assets/haus-fotos/`, ~64 MB). Roharchiv `assets/haus-fotos/` (~65 MB) ist im Repo enthalten (unter GitHubs 100-MB-Dateilimit).

## Projektziel

Ziel ist eine einfache, vertrauenswürdige Website, über die Interessierte das Haus entdecken, Medien ansehen, Preise prüfen und unkompliziert Kontakt- oder Buchungsanfragen stellen können. Die Website soll das Haus zusätzlich zu bestehenden Plattformen sichtbarer machen und perspektivisch als zentrale Informationsseite dienen.

## Aktueller Stand

- **Automatische Bestätigungs-E-Mail an Anfragende via EmailJS, mehrsprachig (04.06.2026):** Zusätzlich zur unveränderten Owner-Benachrichtigung über **Web3Forms** erhält die anfragende Person nach erfolgreichem Versand automatisch eine **Bestätigungs-E-Mail** („Danke für Ihre Anfrage, wir melden uns bald") – in der **zum Absendezeitpunkt aktiven Sprache** (DE/EN/NO). Dafür wurde das **EmailJS Browser-SDK v4** in `index.html` per CDN (`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`) **vor** `script.js` eingebunden. In `script.js` gibt es drei vom Nutzer zu füllende Platzhalter-Konstanten **`EMAILJS_PUBLIC_KEY`**, **`EMAILJS_SERVICE_ID`**, **`EMAILJS_TEMPLATE_ID`** (TODO) sowie `isEmailJsConfigured()`. EmailJS wird nur initialisiert, wenn konfiguriert und SDK vorhanden. Der Auto-Reply ist **nicht-blockierend** und wird erst **nach** dem Web3Forms-Erfolg ausgelöst; Fehler werden nur per `console.warn` ignoriert (die Anfrage selbst ist bereits erfolgreich). Die aktive Sprache wird zur Laufzeit über `window.I18N.getLanguage()` gelesen. Das vom Nutzer einzurichtende **EmailJS-Template** nutzt die Variablen `{{to_email}}`, `{{subject}}`, `{{message}}` (optional `{{from_name}}`, `reply_to`); „To"-Feld = `{{to_email}}`. Neue i18n-Schlüssel: `autoreply.subject` / `autoreply.message` (DE/EN/NO). **Unverändert:** Web3Forms-Owner-Mail, Honeypot, Lade-Status, lokalisierte On-Page-Meldungen, Reset und `mailto:`-Fallback.
- **Neues Hero-Bild: Nordlicht-Holzhaus (04.06.2026):** Das große Hero-Bild oben auf der Seite zeigt jetzt das vom Nutzer bereitgestellte Foto (Holzhaus bei Nacht unter grünem Nordlicht, schneebedecktes Dach, warme Lichterkette am Terrassengeländer, verschneiter Fjord und Berge im Hintergrund) statt der bisherigen Holzterrasse mit Wasserblick. Quelle: Chat-Anhang des Nutzers. Das alte Hero (`assets/hero.jpg`, Terrasse/Wasser) wurde als `assets/hero-terrasse.jpg` gesichert, bevor `assets/hero.jpg` mit dem neuen Motiv überschrieben wurde (per `sips`, JPEG, Qualität 85). Quellbild ist **720 × 540 px** (bereits unter der Projekt-Obergrenze von 2000 px, daher kein Hochskalieren); finale `assets/hero.jpg` = **720 × 540 px** (~51 KB). `src`/`data-lightbox-src` bleiben `assets/hero.jpg`; `<img>`-`width`/`height` von 1920×1280 auf **720×540** an die echten Pixelmaße angepasst (kein Layout-Shift). Bildbeschreibungen (alt/aria-label/Lightbox-Caption) in `index.html` und die i18n-Schlüssel `hero.mediaAria` / `hero.lightboxCaption` in DE/EN/NO auf das Nordlicht-Motiv aktualisiert; Hero-Überschrift/Lead unverändert. **Nachtrag (Cache-Fix):** Weil der gleiche Dateiname `assets/hero.jpg` von Browsern gecacht wurde (altes Terrassen-Bild blieb sichtbar), wurde das neue Hero in **`assets/hero-nordlicht.jpg`** umbenannt und `src`/`data-lightbox-src` in `index.html` darauf umgestellt; `assets/hero-terrasse.jpg` bleibt als Backup.
- **Markenname „Arctic Lodge“ (04.06.2026):** Sichtbarer Markenname von „Lodge in der Arktis“ auf **„Arctic Lodge“** umbenannt – in `index.html` (`<title>`, `.logo-mark`, Hero-`<h1>`, Hero-Lightbox-Caption, `.footer-brand`, `.footer-copy`) sowie in `README.md` und `assets/README.md`. **Unverändert:** Projektordner `Kirkenes Haus`, Repo/Pages-Name `lodge-in-der-arktis`, Ortsnamen (Kirkenes, Sør-Varanger, Pasvikelv) und generische Begriffe wie „die Lodge“ / „Savio Lodge“.
- **Echter Formularversand via Web3Forms (04.06.2026):** Buchungs- (`#bookingForm`) und Kontaktformular (`#contactForm`) senden per `fetch`-POST an Web3Forms (statisch, kein Backend). Platzhalter-Konstanten `WEB3FORMS_ACCESS_KEY` und `CONTACT_EMAIL` oben in `script.js`. Solange der Key Platzhalter ist: eleganter `mailto:`-Fallback (vorausgefüllte E-Mail) + lokalisierter Hinweis; mit echtem Key: Versand mit Lade-Status, lokalisierter Erfolgs-/Fehlermeldung und Reset. Honeypot-Feld `botcheck`, `subject` und `from_name` für lesbare Mails. Prototyp-Hinweise „im Prototyp ohne Versanddienst“ entfernt; Airbnb-Link bleibt. Kontaktliste bleibt „Auf Anfrage“ (`data-todo`).
- **Automatische Mehrsprachigkeit DE/EN/NO (04.06.2026):** Neue Datei `i18n.js` (vor `script.js` geladen) mit vollständigem Wörterbuch Deutsch (Quelle/Standard), Englisch, Norwegisch. Sprachumschalter (DE/EN/NO) im Header; Wahl wird in `localStorage` gespeichert. Automatische Erkennung: (1) gespeicherte Wahl, (2) IP-Geolokalisierung über `ipwho.is`/`ipapi.co` (NO→no, DE/AT/CH/LI→de, sonst→en; async, Timeout, gecacht), (3) `navigator.language`, sonst Deutsch. `<html lang>` wird zur Laufzeit gesetzt; dynamische JS-Strings (Galerie-Filter/Kategorien, Lightbox-`aria-label`s, Formular-Status, Galerie-Leermeldung) sind ebenfalls lokalisiert.
- **GitHub & GitHub Pages (30.05.2026):** Projekt unter https://github.com/spassigxD/lodge-in-der-arktis – Live-URL https://spassigxD.github.io/lodge-in-der-arktis/ (Branch `main`, Root). ZIP `assets/kirkenes_bilder_plaene.zip` in `.gitignore` (Inhalt in `assets/haus-fotos/`).
- **Karten-Bild „Terrasse 1“ aus Galerie entfernt (30.05.2026):** Im Übersichts-Screenshot `001-uebersicht.png` (Airbnb-Fotorundgang) erschien unter „Terrasse 1“ statt eines Terrassenfotos eine Skandinavien-Karte mit rotem Pin. Diese Karte war ausschließlich in diesem zusammengesetzten Übersichts-Screenshot enthalten (keine eigene Bilddatei). Daher wurde die Übersichts-Kachel komplett aus der Galerie genommen: Eintrag in `gallery-data.js` + `gallery.json` gelöscht, `count` 117 → **116**, Datei `assets/airbnb/001-uebersicht.png` entfernt, `build-airbnb-assets.py` überspringt das Übersichts-PNG künftig. Der Lightbox-Zähler ist dynamisch (`items.length`) und passt sich automatisch an. Die echten Terrassenfotos (z. B. `008-/014-/015-aussen.jpg`) und alle Raumkategorien bleiben erhalten; die Lage zeigt weiterhin die echte Google-Maps-Einbettung in `#lage`.
- **Check-in / Check-out (30.05.2026):** Check-in ab **16:00 Uhr**, Check-out um **11:00 Uhr** – in `index.html` in Quick Facts, Willkommenstext, Ausstattung (Allgemein), Hinweise zur Buchung (`#preise`) und Footer eingetragen; `data-todo` für check-in/out entfernt.
- **Impressionen: Schlaf- & Badezimmer 1–3 (30.05.2026):** Unter `#galerie` zeigen die Kategorien **Schlafzimmer** und **Badezimmer** (Tab oder „Alle“) Unterüberschriften **Schlafzimmer 1 / 2 / 3** und **Badezimmer 1 / 2 / 3**. Zuordnung 1:1 aus Airbnb-Ordnern `schlafzimmer_01`–`_03`, `badezimmer_01`–`_02`; **Badezimmer 3** = Quellordner `gaeste_wc` (drittes Nasszimmer, kein separater `badezimmer_03`-Ordner in der Tour). Bildzahlen: Schlafzimmer 1 **7**, 2 **6**, 3 **2**; Badezimmer 1 **4**, 2 **3**, 3 **2**. Lightbox bleibt filterkonform. Build: `scripts/build-airbnb-assets.py`; UI: `script.js`, `styles.css`.
- **Impressionen nach Kategorien (30.05.2026):** Galerie `#galerie` mit Tab-Filter (Alle · Außen & Terrasse · Wohnbereich · Schlafzimmer · Badezimmer · Sauna & Wellness · Aktivitäten) und Unterüberschriften pro Kategorie. **116** Bilder in 6 Kategorien; Lightbox-Navigation respektiert den aktiven Filter. Bugfix: fehlende `@media`-Klammer in `styles.css` (Desktop-Grid); Hinweis in der Galerie, wenn `gallery-data.js` nicht geladen wird (häufig bei `file://` ohne lokalen Server). Manifest-Felder `category` und `room` in `gallery-data.js` / `gallery.json`.
- **Alle Airbnb-Fotos in Galerie (30.05.2026):** ursprünglich **117** Aufnahmen aus `haus-fotos/bilder/von_airbnb/` nach `assets/airbnb/` kopiert (`NNN-raum.jpg`, max. 2000 px); nach Entfernen des Übersichts-Screenshots aktuell **116**. **Hero** = Holzterrasse mit Wasserblick. Galerie rendert alle Bilder per `gallery-data.js` + `initAirbnbGallery()`. Sektions-Hintergründe aus Airbnb-Motiven. Build: `scripts/build-airbnb-assets.py`. Details: `assets/README.md`.
- **Galerie-Beschriftungen ohne Ghosting (27.05.2026, ergänzt 30.05.2026):** Ursprünglich Caption-Block pro Kachel; seit Ziegelberg-Umstrukturierung keine sichtbaren Kachel-Titel mehr im Mosaik (nur Lightbox/`aria-label`).
- **Grundrisse, Lightbox & Hintergrund-Fotos (27.05.2026):** Pläne in `assets/plaene/` verifiziert und korrekt verlinkt (Erd-/Dachgeschoss per Lightbox, PDF in neuem Tab). Lightbox für Hero, Galerie und Grundrisse in `script.js` + `styles.css` (Prev/Next, Esc, Klick außerhalb). Dezente Sektions-Hintergründe aus `assets/bg/` (6 Motive, lazy load, ~8 % Opazität). Details: `assets/README.md`.
- **Gastgeber-Fotos integriert (27.05.2026):** Dropbox-ZIP `kirkenes_bilder_plaene.zip` (~64 MB, 230 Bilder) nach `assets/haus-fotos/` entpackt. Sieben Aufnahmen als webfreundliche Dateien in `assets/` kopiert und in `index.html` eingebunden: **Hero** (`hero.jpg`, Außenansicht am Wasser), **Galerie** (6 Kacheln: Außen, Wohnbereich, Schlafzimmer, Küche, Umgebung, Nordlichter). Grundrisse in `assets/plaene/` verlinkt (Erd-/Dachgeschoss, Planskizze PDF). Upload-Vorschau in der Galerie unverändert. Details: `assets/README.md`.
- **Anreise: Kartenbild 1 & 3 getauscht (27.05.2026):** In der 3er-Autokarten-Sektion wurden `assets/car-kompakt.jpg` und `assets/car-kombi.jpg` durch klarere Wintermotive mit besser sichtbaren Fahrzeugen ersetzt; `alt`-Texte in `index.html` dafür präzisiert, Layout unverändert.
- **Textupdate Wohnbereich/Badezimmer (27.05.2026):** In Highlights/Ausstattung ist der Wohnbereich jetzt klar mit **Kamin innen** und **Feuerstelle draußen** beschrieben. Im Badezimmer wurde der Wortlaut von „Ein Föhn ist verfügbar“ auf **„Föhn verfügbar“** vereinheitlicht.
- **Ausstattung Schlafzimmer/Badezimmer präzisiert (27.05.2026):** In der Ausstattungssektion ist Bettwäsche jetzt als enthalten markiert; der Punkt Stauraum wurde entfernt. Im Badezimmer sind Handtücher als vorhanden ergänzt und ein verfügbarer Föhn ausgewiesen.
- **Ortsangabe und Adresse (27.05.2026):** Sichtbare Lage-Texte und Adressen nutzen **Sør-Varanger** statt Neiden; Postleitzahl (9930) entfernt. Adresse: Vaggeveien 12, Sør-Varanger, Norwegen. Google-Maps-Links/Einbettung funktional unverändert (URLs mit PLZ für Geocoding).
- **Sichtbarer Markenname auf der Website (27.05.2026):** „Lodge in der Arktis“ (ersetzt „Kirkenes Haus“ in Titel, Logo, Hero, Footer); Ortsname Kirkenes in Lage- und Reisetexten unverändert.
- **Sterne-Dekoration entfernt (27.05.2026):** Platzhalter-Sterne (✸) im Hero und in den Bewertungskarten entfernt; zugehörige CSS-Klassen `.stars` und `.stars-small` gelöscht.
- Statischer Prototyp ohne Build-System: `index.html`, `styles.css`, `script.js`.
- Design orientiert an luxuriösen Chalet-Websites (Referenz: [Ziegelberg Chalets – Waldblick](https://www.ziegelberg-chalets.de/chalet-waldblick)): großzügiger Vollbild-Hero, Serif/Sans-Typografie (Cormorant Garamond + Source Sans 3), viel Weißraum, dezente Farben.
- Sektionen: Willkommenstext, Quick Facts, Highlights, Ausstattung, **Grundriss** (Erd-/Dachgeschoss), **Galerie** (Foto-Mosaik), Preise mit Buchungshinweisen, Bewertungen, Lage mit Entfernungs-Kacheln (teilweise Google-Maps-Links), **Anreise** (Mietwagen-Empfehlung am Flughafen KKN), Buchungs- und Kontaktformular, Footer.
- Galerie: **116 Airbnb-Fotos** in **6 Kategorien** mit Tab-Filter und Mosaik-Grids; Lightbox mit filterabhängiger Navigation; Upload-Vorschau im Browser; Planskizze (JPG/PDF) in der Grundriss-Sektion; `assets/README.md` mit Vollständiger Bildliste.
- **Sektions-Hintergründe (27.05.2026):** Dezente Foto-Einblendung in `#haus`, `#highlights`, `#ausstattung`, `#preise`, `#bewertungen`, `#lage` aus `assets/bg/` (lazy load, Parallax auf Desktop).
- **Bestätigte Hausdaten (27.05.2026):** max. 10 Gäste, 3 Schlafzimmer, 7 Betten, 3 Badezimmer, Adresse Vaggeveien 12, Sør-Varanger, Norwegen; Ausstattung u. a. Sauna, Kamin innen, Feuerstelle draußen, Terrasse, Balkon, WLAN/Glasfaser, Parkplatz, TV, Küche, Workspace, Waschmaschine, direkt am Wasser; Mindestaufenthalt 2 Nächte; Google Maps eingebettet.
- **Lage-Links (27.05.2026):** Im Entfernungs-Grid verlinkt: Kirkenes (Einkaufen) und Flughafen Kirkenes – jeweils als klickbare Google-Maps-Kacheln (`target="_blank"`, `rel="noopener noreferrer"`). Natur/Ausflüge und Grenzregion bleiben Platzhalter.
- **Anreise-Sektion (27.05.2026):** Neue Sektion `#anreise` zwischen Lage und Buchung; Navigation und Footer verlinken „Anreise“. Positiver Verkaufstext auf Deutsch, klare Empfehlung Mietwagen, Anbieterliste (Avis, Hertz, Sixt, Europcar, Budget, Thrifty, National/Enterprise), drei Beispiel-Fahrzeuge mit Fotos in `assets/` (`car-kompakt.jpg`, `car-suv.jpg`, `car-kombi.jpg`) und **Schätz-Richtpreisen in Euro** (umgerechnet, ca. 1 EUR ≈ 11,5 NOK). Links zu Budget.no, Hertz.no, Europcar.no; Preishinweis mit Quellenangabe im Footer der Sektion.
- **Anreise: Fotos & EUR (27.05.2026):** Mietwagen-Karten mit echten `<img>`-Tags (Pexels/Unsplash, siehe `assets/README.md`); CSS `object-fit: cover`, Seitenverhältnis 16:10. Richtpreise in EUR: Kompakt ab ca. 65 €/Tag · 365 €/Woche; SUV ab ca. 95 € · 565 €; Kombi ab ca. 83 € · 490 €. Disclaimer: unverbindliche Richtwerte, Wechselkurs-Hinweis, am Flughafen Kirkenes buchbar.
- **Anreise: Winter-Mietwagen-Fotos (27.05.2026):** Die drei Auto-Bilder in `#anreise` durch lizenzfreie Winter-/Schnee-Motive ersetzt (Unsplash Tromsø, Pexels SUV im Schneesturm, Pexels schneebedeckter Van); deutsche `alt`-Texte mit Winter/Norwegen/Mietwagen; Quellen in `assets/README.md`.
- **Anreise-Text Finnland (27.05.2026):** Verkaufstext in `#anreise` angepasst: Russland-/Grenzregion-Formulierungen durch positive Hinweise auf die finnische Grenzregion, Tagesausflüge nach Finnland, Einkaufen in Kirkenes und Nordkap-Nähe ersetzt; Mietwagen-Layout und restliche Sektion unverändert.
- **Preise (27.05.2026):** Gastgeber-Richtwert eingepflegt: ca. **2.000 € / Woche** (7 Nächte), abgeleitet ca. **286 € / Nacht**. Highlight-Karte „Nordlicht &amp; Winter“ zeigt Wochenpreis; Nebensaison/Sommer mit Nachtpreis. Währung EUR statt NOK-Platzhalter; Mindestaufenthalt 2 Nächte unverändert. Reinigungsgebühr und saisonale Feinabstufungen weiter offen.
- Noch offen (Platzhalter/TODO): m², Haustyp, finale Saisonpreise je Zeitraum, Reinigungsgebühr, Kontaktdaten, Entfernungen Natur/Grenzregion.
- Optionale Ergänzung: weitere Motive aus `assets/haus-fotos/bilder/jaana/` (Nordlichter, Weihnachten) bei Bedarf.
- Dokumentationsordner `Ideen/` angelegt.
- Auftrags- und Ideenprotokoll in `Ideen/auftrags-und-ideenprotokoll.md` angelegt.
- Projektregel unter `.cursor/rules/project-updates.mdc` erstellt, damit künftige Agenten bei jedem neuen Auftrag zuerst Dokumentation und Ideenprotokoll pflegen.
- Marketing- und Plattformideen wurden in `Ideen/marketing-und-plattformen.md` gesammelt.

## Dateistruktur

```text
.
├── .cursor/
│   └── rules/
│       └── project-updates.mdc
├── Ideen/
│   ├── auftrags-und-ideenprotokoll.md
│   └── marketing-und-plattformen.md
├── assets/
│   ├── airbnb/              → 117 optimierte Airbnb-Fotos + gallery.json
│   ├── haus-fotos/          → Roharchiv (Dropbox-ZIP)
│   ├── plaene/              → Grundrisse & Lageplan
│   ├── bg/                  → Sektions-Hintergründe (optimiert)
│   ├── hero.jpg                → Hero-Bild (seit 04.06.2026 Nordlicht-Holzhaus)
│   ├── hero-terrasse.jpg       → vorheriges Hero (Terrasse/Wasser, gesichert)
│   ├── car-kompakt.jpg
│   ├── car-suv.jpg
│   ├── car-kombi.jpg
│   └── README.md
├── scripts/
│   └── build-airbnb-assets.py
├── index.html
├── i18n.js                  → Wörterbuch DE/EN/NO + Spracherkennung/-umschalter (vor script.js geladen)
│                             enthält auch autoreply.subject/-message (EmailJS-Bestätigung)
├── script.js                → Web3Forms (Owner-Mail) + EmailJS (Auto-Bestätigung); EmailJS-SDK v4 per CDN
                                in index.html (vor script.js) eingebunden
├── styles.css
└── README.md
```

## Website Öffnen

Die Website kann direkt im Browser geöffnet werden:

```bash
open "/Users/spassig/Arbeit/Umbuzoo/Coding/Kirkenes Haus/index.html"
```

Optional kann lokal ein kleiner Server gestartet werden:

```bash
cd "/Users/spassig/Arbeit/Umbuzoo/Coding/Kirkenes Haus"
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen. Den Server anschließend im Terminal mit `Ctrl+C` beenden.

## Nächste Schritte

- **Offen vom Nutzer (04.06.2026):**
  1. **Web3Forms Access Key** in `script.js` eintragen (Konstante `WEB3FORMS_ACCESS_KEY`, gratis Key von https://web3forms.com) **und** echte Kontaktdaten: E-Mail für den mailto-Fallback (Konstante `CONTACT_EMAIL` in `script.js`) sowie E-Mail/Telefon/WhatsApp in der Kontaktliste (`#kontakt`, `.contact-list`, aktuell „Auf Anfrage“).
  2. **Sprachset bestätigen** (aktuell DE/EN/NO) – ggf. weitere Sprachen ergänzen.
  3. **EmailJS einrichten** (für die automatische Bestätigung an Anfragende): kostenloses Konto auf https://www.emailjs.com, Service + Template anlegen und die drei Konstanten in `script.js` füllen: `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`. Das Template muss die Variablen `{{to_email}}` (= „To"-Empfänger), `{{subject}}`, `{{message}}` (optional `{{from_name}}`, `reply_to`) verwenden. Solange Platzhalter stehen, wird der Auto-Reply sicher übersprungen; Web3Forms bleibt davon unberührt.
- Verbleibende `data-todo`-Felder: m², finale Saisonpreise je Zeitraum, Reinigungsgebühr, Kaffeemaschine, Haustiere, Entfernungen Natur/Grenzregion.
- Weitere Fotos aus `assets/haus-fotos/` auswählen (Sauna, Esszimmer, Keller) und Galerie erweitern; Hero-Bild bei Bedarf tauschen.
- Buchungsanfragen weiter ausbauen: optional Kalenderintegration/Verfügbarkeitskalender oder später ein kleines Backend.
- Bewertungen aus Airbnb oder anderen Plattformen rechtlich sauber übernehmen oder als manuelle Zitate pflegen.
- Optional weitere Sprachen (z. B. Chinesisch) für ausgewählte Marketing-Inhalte.

## Pflegepflicht

Bei jedem neuen Auftrag in diesem Projekt müssen zuerst diese `README.md` und `Ideen/auftrags-und-ideenprotokoll.md` aktualisiert werden. Neue Anforderungen, Entscheidungen und offene Fragen sollen dort festgehalten werden, bevor Code geändert wird.
