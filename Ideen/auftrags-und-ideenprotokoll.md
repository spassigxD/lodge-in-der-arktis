# Auftrags- und Ideenprotokoll

## 2026-06-04 - EmailJS aktiviert & verifiziert (Auto-Bestätigung DE/EN/NO)

- Nutzer hat EmailJS-Konto erstellt und die drei Werte geliefert; in `script.js` eingetragen: `EMAILJS_PUBLIC_KEY = "Vtmt7cpivLBxCMd53"`, `EMAILJS_SERVICE_ID = "service_8n48mab"`, `EMAILJS_TEMPLATE_ID = "template_5gs51l8"` (öffentliche Client-IDs, dürfen im Repo stehen).
- EmailJS-Template angelegt (HTML im Arctic-Lodge-Stil) mit Variablen `{{to_email}}` (To), `{{subject}}`, `{{message}}`, `{{from_name}}`; `white-space:pre-line` für korrekte Zeilenumbrüche aus dem lokalisierten Text.
- **Verifiziert:** `emailjs.send(...)` mit den echten IDs liefert **Status 200 OK** (Key/Service/Template gültig, Template-Variablen akzeptiert). SDK lädt, `window.I18N.getLanguage()` liefert die aktive Sprache → Auto-Reply folgt DE/EN/NO. Web3Forms (Eigentümer-Mail) unverändert.
- **Noch offen:** echter End-to-End-Test mit einer realen Empfänger-Adresse (nur der Nutzer hat Postfach-Zugriff). **Sicherheits-Tipp:** in EmailJS unter Account die „Allowed Origins" auf die spätere Domain (arcticlodge.net) beschränken, um Missbrauch des öffentlichen Keys zu verhindern. `CONTACT_EMAIL` (mailto-Fallback / reply_to) weiterhin optional zu setzen.

## 2026-06-04 - Automatische Bestätigungs-E-Mail an Anfragende via EmailJS (mehrsprachig)

- Nutzerwunsch: Zusätzlich zur bestehenden Owner-Benachrichtigung (Web3Forms, unverändert) soll der/die **Anfragende automatisch eine Bestätigungs-E-Mail** erhalten („Danke für Ihre Anfrage, wir melden uns bald") – und zwar in der **aktuell aktiven Sprache** der Website (DE/EN/NO) zum Zeitpunkt des Absendens. Die bestehende AJAX-UX (kein Reload, vorhandene On-Page-Erfolgs-/Fehlermeldung) bleibt erhalten.
- **Entscheidung des Nutzers (steht fest):** Web3Forms bleibt **exakt wie bisher** für die Owner-Benachrichtigung. EmailJS kommt **zusätzlich** nur für die Auto-Bestätigung an die anfragende Person hinzu.
- **Umsetzung:**
  - **EmailJS Browser-SDK v4** in `index.html` per offizieller CDN eingebunden (`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`), geladen **vor** `script.js` (nach `i18n.js`).
  - In `script.js` neben der Web3Forms-Config drei klar markierte **Platzhalter-Konstanten** ergänzt: `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` (TODO: vom Nutzer mit echten Werten zu füllen). Neue Funktion `isEmailJsConfigured()` liefert `false`, solange noch ein Platzhalter steht.
  - EmailJS wird per `emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })` **nur** initialisiert, wenn konfiguriert **und** das SDK geladen ist.
  - In `handleFormSubmit` wird **nach erfolgreichem Web3Forms-Versand** (`response.ok && result.success`) – falls konfiguriert und SDK vorhanden – eine **nicht-blockierende** Auto-Bestätigung via `emailjs.send(...)` ausgelöst. Sie ändert/blockiert die On-Page-Erfolgsmeldung nicht; Fehler werden gefangen und nur per `console.warn` geloggt (die Anfrage selbst ist bereits erfolgreich).
  - `templateParams`: `to_email` (Anfragenden-E-Mail: `contactEmail` beim Kontakt-, `email` beim Buchungsformular), `subject` (lokalisierter Betreff), `message` (lokalisierter Text), `from_name` = „Arctic Lodge", `reply_to` (= Owner-/Kontakt-Adresse, falls gesetzt). Die Felder werden generisch aus dem jeweiligen Formular gelesen (Funktion behandelt beide Formulare).
- **EmailJS-Template (vom Nutzer einzurichten)** muss die Variablen `{{to_email}}`, `{{subject}}`, `{{message}}` (sowie optional `{{from_name}}`, `reply_to`) verwenden; das „To"-Feld des Templates auf `{{to_email}}` setzen.
- **Neue i18n-Schlüssel** (DE/EN/NO) in `i18n.js`: `autoreply.subject` und `autoreply.message`.
  - DE Betreff: „Danke für Ihre Anfrage – Arctic Lodge"; Text: warme 2–3 Sätze, signiert „Ihr Arctic Lodge Team".
  - EN/NO: natürliche Entsprechungen.
- **Wo der Nutzer seine IDs einträgt:** in `script.js` die Konstanten `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` (Platzhalter ersetzen).
- **Unverändert:** Web3Forms-Owner-Mail, Honeypot, Lade-Status, lokalisierte On-Page-Erfolgs-/Fehlermeldung, Formular-Reset bei Erfolg, sowie der `mailto:`-Fallback, solange der Web3Forms-Key ein Platzhalter ist.
- Verifikation lokal über `python3 -m http.server 8000` (Cache-Busting-Query). Ohne echte EmailJS-IDs ist der Auto-Reply-Pfad sicher übersprungen; Web3Forms funktioniert weiter. Kein Commit/Push; nur im Projektordner `Kirkenes Haus` gearbeitet.

## 2026-06-04 - Kontakt-/Buchungsformular scharf geschaltet (Web3Forms)

- Nutzerwunsch: Die Kontaktanfrage soll **tatsächlich funktionieren** (echter Versand, nicht nur Prototyp/mailto).
- Umgesetzt: Der bereits eingebaute Web3Forms-Versand wurde mit dem vom Nutzer bereitgestellten **Access Key** aktiviert – in `script.js` Konstante `WEB3FORMS_ACCESS_KEY` (Platzhalter ersetzt). Der Key ist an die Empfänger-E-Mail des Nutzers gebunden (bei der Key-Erstellung auf web3forms.com festgelegt); er ist öffentlich und darf im Client-Code/Repo stehen.
- Beide Formulare (`#contactForm` Kontakt, `#bookingForm` Buchung) senden per `fetch` an `https://api.web3forms.com/submit`; bei Erfolg lokalisierte Bestätigung + Reset, sonst Fehlermeldung. Honeypot `botcheck` aktiv.
- **Verifikation (bestätigt):** Echte Test-Anfrage über das Kontaktformular im Browser abgeschickt → Erfolgsmeldung „Vielen Dank! Ihre Anfrage wurde gesendet …“ erschien und das Formular wurde geleert. **End-to-End bestätigt:** Die Test-E-Mail ist im Postfach des Nutzers angekommen (04.06.2026).
- **Noch offen / optional:** `CONTACT_EMAIL` in `script.js` (nur für den mailto-Fallback, der bei gesetztem Key nicht mehr greift) steht noch auf Platzhalter; bei Bedarf auf die echte Adresse setzen. Sichtbare Kontaktdaten (E-Mail/Telefon/WhatsApp) im Kontaktbereich weiterhin „Auf Anfrage“ (i18n-Schlüssel `kontakt.email`/`kontakt.phone`/`kontakt.whatsapp`).

## 2026-06-04 - Neues Hero-Bild: Nordlicht-Holzhaus

- Nutzerwunsch: Das vom Nutzer per Chat bereitgestellte Foto (Holzhaus bei Nacht unter grünem Nordlicht/Aurora, schneebedecktes Dach, warme Lichterkette am Terrassengeländer, verschneiter Fjord und Berge im Hintergrund) als großes **Hero-Bild** oben auf der Seite verwenden – ersetzt die bisherige Holzterrasse mit Wasserblick.
- **Quelle:** Chat-Anhang des Nutzers (verifiziert als Nordlicht-Holzhaus-Foto).
- **Altes Hero gesichert:** bestehendes `assets/hero.jpg` (Terrasse/Wasser) nach `assets/hero-terrasse.jpg` kopiert, damit es nicht verloren geht (war nur als Hero in Verwendung).
- **Konvertierung:** Quellbild per macOS `sips` als optimiertes JPEG (Qualität 85) nach `assets/hero.jpg` (überschrieben). Quellauflösung **720 × 540 px** liegt bereits unter der Projekt-Obergrenze von 2000 px (längste Kante) – daher kein Hochskalieren; finale `assets/hero.jpg` = **720 × 540 px** (~51 KB). Echte Pixelmaße per `sips -g pixelWidth -g pixelHeight` ausgelesen und als `width="720"` / `height="540"` am Hero-`<img>` in `index.html` gesetzt (vorher 1920×1280; vermeidet Layout-Shift).
- **Pfade unverändert:** `src="assets/hero.jpg"` und `data-lightbox-src="assets/hero.jpg"` bleiben; das neue Bild wird automatisch übernommen.
- **Cache-Fix / Umbenennung (04.06.2026):** Da der Dateiname identisch blieb, zeigten Browser weiter das alte (gecachte) Terrassen-Bild („Bild nicht sichtbar“). Lösung: neues Hero in `assets/hero-nordlicht.jpg` umbenannt und `src`/`data-lightbox-src` in `index.html` darauf umgestellt – erzwingt frischen Abruf bei allen Browsern und GitHub-Pages-Besuchern. `assets/hero-terrasse.jpg` bleibt als Backup des alten Heros.
- **Beschreibungen aktualisiert:** literale Fallback-`aria-label`/`data-lightbox-caption` im HTML sowie i18n-Werte `hero.mediaAria` und `hero.lightboxCaption` in **DE/EN/NO** auf das Nordlicht-Motiv umgestellt. Vorschläge: DE „Arctic Lodge bei Nordlicht – Holzhaus im Schnee in Sør-Varanger“, EN „Arctic Lodge under the northern lights – timber cabin in the snow in Sør-Varanger“, NO „Arctic Lodge under nordlyset – tømmerhytte i snøen i Sør-Varanger“. Hero-Überschrift/Lead und unrelated Übersetzungen unverändert.
- Verifikation lokal über `python3 -m http.server 8000`; kein Commit/Push. Nur im Projektordner `Kirkenes Haus` gearbeitet.

## 2026-06-04 - Markenname „Arctic Lodge“, echter Formularversand & automatische Mehrsprachigkeit

Drei zusammenhängende Aufträge in einem Durchgang umgesetzt (alle berühren `index.html` / `script.js`).

### Aufgabe A – Markenname „Lodge in der Arktis“ → „Arctic Lodge“
- Nutzerwunsch: sichtbarer Markenname auf „**Arctic Lodge**“ umbenennen.
- Ersetzt in `index.html`: `<title>`, `.logo-mark`, Hero-`<h1>`, Hero-Lightbox `data-lightbox-caption`, `.footer-brand`, `.footer-copy`.
- `README.md` und `assets/README.md`: Markenerwähnungen auf „Arctic Lodge“ aktualisiert.
- **Bewusst unverändert:** Projektordner `Kirkenes Haus`, GitHub-Repo/Pages-Name `lodge-in-der-arktis`, Ortsnamen (Kirkenes, Sør-Varanger, Pasvikelv) sowie generische Wörter wie „die Lodge“ / „Savio Lodge“ in beschreibenden Texten. Historische Protokolleinträge bleiben erhalten (nur dieser neue Eintrag ergänzt).

### Aufgabe B – Formulare versenden wirklich (Buchung + Kontakt)
- Integration von **Web3Forms** (funktioniert auf statischen GitHub Pages ohne Backend). Beim Absenden `fetch`-POST an `https://api.web3forms.com/submit` mit `FormData` inkl. `access_key`.
- Platzhalter-Konstante oben in `script.js`: `WEB3FORMS_ACCESS_KEY` (TODO: echten Key eintragen) und `CONTACT_EMAIL` (TODO: echte Adresse für den mailto-Fallback).
- **Verhalten:** Ist der Key noch Platzhalter → eleganter Fallback auf vorausgefüllte `mailto:`-Mail + lokalisierter Hinweis. Mit echtem Key → echter Versand mit Lade-Status am Button, lokalisierter Erfolgs-/Fehlermeldung, Formular-Reset bei Erfolg.
- **Spam-Schutz:** verstecktes Honeypot-Feld `botcheck` in beiden Formularen; `subject` und `from_name` für lesbare E-Mails.
- Prototyp-Texte ersetzt: Buchungs-Intro und Kontakttext sagen nicht mehr „im Prototyp ohne Versanddienst“ – jetzt echte Anfrage. Airbnb-Link bleibt.
- Kontaktliste (`.contact-list` E-Mail/Telefon/WhatsApp) bleibt „Auf Anfrage“ mit `data-todo`-Markern (echte Werte offen).

### Aufgabe C – Automatische Sprachumschaltung nach Standort (i18n)
- Neue Datei **`i18n.js`** (vor `script.js` eingebunden) mit Wörterbuch DE/EN/NO; Deutsch bleibt Quelle/Standard.
- Alle sichtbaren Texte in `index.html` mit `data-i18n` (Textinhalt) bzw. `data-i18n-*` für Attribute (placeholder, aria-label, title, alt, content, Lightbox-Caption) ausgezeichnet; vollständige Übersetzungen DE/EN/NO für jede Sektion.
- **Erkennungsreihenfolge:** (1) gespeicherte Wahl in `localStorage`; (2) IP-Geolokalisierung über `https://ipwho.is/` (Fallback `https://ipapi.co/json/`), Mapping NO→no, DE/AT/CH/LI→de, sonst→en (async, mit Timeout, gecacht); (3) `navigator.language`; finaler Fallback de.
- **Sprachumschalter** (DE/EN/NO) im Header (`.site-header`), im Ziegelberg-Stil; aktualisiert die Seite live, setzt `document.documentElement.lang` und speichert die Wahl.
- Dynamische JS-Strings ebenfalls lokalisiert: Galerie-Filter „Alle“ + Kategorien/Räume, Lightbox-`aria-label`s, Formular-Statusmeldungen, Galerie-Leermeldung, „vergrößern“-Label.

### Offene Punkte (Nutzer)
1. **Web3Forms Access Key** (`script.js`, Konstante `WEB3FORMS_ACCESS_KEY`) sowie echte Kontaktdaten (E-Mail für `CONTACT_EMAIL`/Kontaktliste, Telefon, WhatsApp).
2. **Bestätigung des Sprachsets** (aktuell DE/EN/NO) – ggf. weitere Sprachen.

- Verifikation lokal über `python3 -m http.server 8000`. Nur im Projektordner `Kirkenes Haus` gearbeitet; kein Commit/Push.

## 2026-05-30 - GitHub-Repository und GitHub Pages

- Nutzerwunsch: Projekt als eigenes GitHub-Repo mit dauerhaftem Web-Zugriff (GitHub Pages).
- Repo: **lodge-in-der-arktis** (öffentlich), Branch `main`, Site aus Repository-Root.
- URLs: https://github.com/spassigxD/lodge-in-der-arktis · https://spassigxD.github.io/lodge-in-der-arktis/
- `.gitignore`: `.cursor/`, `assets/kirkenes_bilder_plaene.zip` (~64 MB Duplikat), keine Secrets.
- `assets/haus-fotos/` (~65 MB Roharchiv) bleibt im Repo (unter 100 MB); Website nutzt primär `assets/airbnb/`, `hero.jpg`, `plaene/`, `bg/`, Auto-Bilder.
- Relative Pfade in `index.html` / `gallery-data.js` – kompatibel mit HTTPS Pages.


Diese Datei ist das laufende Protokoll für Anforderungen, Nutzerideen, Entscheidungen und offene Punkte. Sie muss bei jedem neuen Auftrag in diesem Projekt zusammen mit der `README.md` aktualisiert werden, bevor die Umsetzung beginnt.

## 2026-05-30 - Impressionen: Schlafzimmer & Badezimmer 1–3

- Nutzerwunsch: In `#galerie` feinere Unterteilung – **Schlafzimmer 1 / 2 / 3** und **Badezimmer 1 / 2 / 3** (Haus hat 3 Badezimmer); Lightbox pro Filter weiter funktionsfähig; Galerie-Bilder sichtbar halten.
- **Quelle / Zuordnung (Airbnb `von_airbnb/`):**
  - `schlafzimmer_01` → Schlafzimmer 1 (**7** Bilder)
  - `schlafzimmer_02` → Schlafzimmer 2 (**6**)
  - `schlafzimmer_03` → Schlafzimmer 3 (**2**)
  - `badezimmer_01` → Badezimmer 1 (**4**)
  - `badezimmer_02` → Badezimmer 2 (**3**)
  - `gaeste_wc` → **Badezimmer 3** (**2**) – kein eigener `badezimmer_03`-Ordner in der Airbnb-Tour; Gäste-WC als drittes Nasszimmer unter „Badezimmer 3“ geführt (nicht eigene Tab-Kategorie).
- **UI:** `h3` Kategorie + `h4` Raum-Unterüberschriften in `script.js` (`GALLERY_SUBSECTIONS`, `GALLERY_ROOM_LABELS`); Styles `.gallery-subsection-heading` in `styles.css`. Tab-Filter unverändert auf Oberkategorien.
- **Technik:** `scripts/build-airbnb-assets.py` – Slug `badezimmer-3` statt `gaeste-wc`; Galerie neu gebaut (`gallery-data.js`, `089-/090-badezimmer-3.jpg`). Gesamt weiter **116** Bilder.
- Lightbox: Gruppe `galerie`, überspringt `[hidden]` – bei Filter „Schlafzimmer“ / „Badezimmer“ nur sichtbare Untergrids. Nur Projektordner.

## 2026-05-30 - Impressionen: Kategorien + Galerie-Bugfix

- Nutzerwunsch: Bilder in `#galerie` nach sinnvollen Kategorien gruppieren (Zimmer, Außen/Terrasse, Aktivitäten, Sauna …); Bug beheben, dass **keine Bilder** angezeigt werden; Ziegelberg-Stil beibehalten.
- **Bug-Ursache:** Die Galerie-Logik (`initAirbnbGallery()`) bricht still ab, wenn `window.__airbnbGallery` fehlt – passiert u. a. wenn `assets/airbnb/gallery-data.js` beim direkten Öffnen von `index.html` per `file://` nicht geladen wird (Browser-Sicherheitsrestriktionen). Zusätzlich fehlte in `styles.css` die öffnende `@media (min-width: 1024px)`-Regel vor dem Desktop-Galerie-Grid (verwaiste `}` ab Zeile 576).
- **Fix:** Sichtbarer Hinweistext in `#galleryShell`, wenn keine Galerie-Daten geladen wurden; CSS-Media-Query repariert; Galerie rendert nur bei erfolgreichem Daten-Load.
- **Kategorien (116 Bilder):**
  - Außen & Terrasse: **26**
  - Wohnbereich (Wohnzimmer, Esszimmer, Küche): **40**
  - Schlafzimmer: **15**
  - Badezimmer (inkl. Gäste-WC): **9**
  - Sauna & Wellness: **3**
  - Aktivitäten & Umgebung: **23**
- **UI:** Tab-Filter über der Galerie; Modus „Alle“ zeigt Unterüberschriften + Grids pro Kategorie; Einzelfilter blendet nur die gewählte Kategorie ein. Lightbox-Gruppe `galerie` bleibt; Prev/Next überspringt `[hidden]`-Kacheln (filterkonform). Keine sichtbaren Kachel-Titel (Ghosting-Fix unverändert).
- **Technik:** `category` in `gallery-data.js` / `gallery.json`; `scripts/build-airbnb-assets.py` erweitert; `index.html` (`#galleryFilters`, `#galleryShell`), `script.js`, `styles.css` angepasst.
- Empfehlung lokaler Server: `python3 -m http.server 8000` → `http://localhost:8000`. Nur Projektordner.

## 2026-05-30 - Karten-Bild „Terrasse 1“ aus Galerie entfernt

- Nutzerwunsch: Im Fotorundgang (Ziegelberg-Stil) erscheint bei **„Terrasse 1“** kein Terrassenfoto, sondern eine **Skandinavien-Karte mit rotem Pin**. Dieses eine Karten-Bild soll raus – nicht die ganze Kategorie Terrasse.
- Befund: Die Karte ist **keine eigene Bilddatei**. Sie ist Teil des zusammengesetzten Übersichts-Screenshots `001-uebersicht.png` (Quelle `01_uebersicht.png`), der den kompletten Airbnb-Fotorundgang als ein Bild zeigt. Dieses Übersichtsbild war Galerie-Eintrag Nr. 1 (Titel „Übersicht“, Layout `wide`). Ein Bildvergleich aller 117 Galerie-/Quellbilder fand kein separates Karten-/Lageplan-Bild im Fotorundgang.
- Entscheidung: Da die Karte nur über diesen Screenshot sichtbar ist, wird die **Übersichts-Kachel komplett entfernt**. Sie ist ohnehin ein Airbnb-UI-Screenshot (alle Miniaturen existieren als echte Vollbilder weiter unten in der Galerie), kein echtes Foto.
- Umsetzung: Eintrag `001-uebersicht.png` aus `gallery-data.js` und `gallery.json` gelöscht; `count` 117 → **116**; Datei `assets/airbnb/001-uebersicht.png` gelöscht; `scripts/build-airbnb-assets.py` überspringt das Übersichts-PNG künftig; `assets/README.md` (Anzahl + Bildliste) aktualisiert. Der Lightbox-Zähler ist dynamisch und braucht keine Anpassung; ein statischer Galerie-Zähler existiert nicht mehr.
- Lage/Karte bleibt korrekt über die echte Google-Maps-Einbettung in `#lage`; echte Terrassenfotos bleiben in der Galerie erhalten. Nur im Projektordner gearbeitet.

## 2026-05-30 - Galerie-Leadtext entfernt

- Nutzerwunsch: Sichtbaren Lead-Text unter „Impressionen“ in `#galerie` entfernen („Alle 117 Aufnahmen … Pfeiltasten durchblättern.“); Überschrift/Eyebrow behalten; keine Reste auf der Website.
- Umgesetzt: Absatz in `index.html` (`#galerie` > `.section-heading`) entfernt; `#galleryCount`-Aktualisierung in `script.js` entfernt (nur für diesen Text).
- README/`assets/README.md` unverändert (Projekt-Doku). Keine Änderungen außerhalb des Projektordners.

## 2026-05-30 - Check-in und Check-out eingetragen

- Nutzerwunsch: Check-in ab **16:00 Uhr**, Check-out um **11:00 Uhr**; alle Platzhalter „Auf Anfrage“ für Check-in/out in `index.html` ersetzen; Dokumentation pflegen; Website in Safari öffnen.
- Umgesetzt in `index.html`:
  - **Quick Facts** (`#haus`): `ab 16:00 Uhr` / `11:00 Uhr`; `data-todo="check-in"` und `data-todo="check-out"` sowie HTML-TODO-Kommentare entfernt.
  - **Willkommenstext** (`#haus`): Check-in/out und Mindestaufenthalt statt „ergänzen wir, sobald …“.
  - **Ausstattung** (`#ausstattung`, Block „Allgemein“): Check-in/out als bestätigter Punkt.
  - **Hinweise zur Buchung** (`#preise`, `.policy-notes`): eigene Listenpunkte Check-in / Check-out.
  - **Footer**: Zeile mit Check-in/out unter der Adresse.
- `README.md` und dieses Protokoll aktualisiert (30.05.2026). Keine Änderungen außerhalb des Projektordners.

## 2026-05-30 - Grundriss vor Galerie (Ziegelberg-Orientierung)

- Nutzerwunsch (27.05.2026): Design weiter an [Ziegelberg Chalets – Waldblick](https://www.ziegelberg-chalets.de/chalet-waldblick) – **Grundrisse zuerst**, danach **Fotogalerie**; elegant, viel Weißraum, Serif-Überschriften, keine doppelten Beschriftungen.
- Referenz-Analyse: Ziegelberg – Grundrisse als eigene Sektion mit großen Bildern **nebeneinander** (EG/OG), Lightbox; Fotogalerie als Grid mit Fancybox („Alle Fotos“ auf der dritten Kachel); danach Ausstattung. Serif-Headlines, großzügige Abstände, dezente Farben.
- Umgesetzt:
  - `#grundriss` zwischen `#ausstattung` und `#galerie`: Plan-Karten Erd-/Dachgeschoss, Planskizze JPG (Lightbox) + PDF.
  - `#galerie` ohne Grundriss-Links am Ende; reines Foto-Mosaik.
  - Galerie ohne sichtbare Kachel-Beschriftungen (Titel nur Lightbox/`aria-label`).
  - Lightbox-Gruppen: `hero`, `grundriss`, `galerie` – Prev/Next nur innerhalb der Gruppe.
  - Navigation/Footer: „Grundriss“ vor „Galerie“.
- Entscheidung: Seitenfluss Hero → Haus → Highlights → Ausstattung → **Grundriss → Galerie** → Preise …

## 2026-05-30 - Alle Airbnb-Fotos: Galerie, Hero, Benennung

- Nutzerwunsch: **Alle** Bilder aus `assets/haus-fotos/bilder/von_airbnb/` verwenden, webfreundlich benennen, Galerie komplett füllen, Hero mit bestem Außen/Wasser-Motiv, Lightbox für alle Galerie-Bilder, Hintergründe aktualisieren, Platzhalter entfernen, Dokumentation pflegen.
- Inventar: **117** Dateien (JPG/JPEG/PNG) unter `von_airbnb/` (26 Außen, 23 Aktivitäten, 18 Wohnzimmer, 15 Esszimmer, 7 Küche, 15 Schlafzimmer, 9 Bad/Gäste-WC, 3 Sauna, 1 Übersicht-PNG).
- `assets/airbnb/`: Schema `NNN-raum.jpg`; `gallery.json` + `gallery-data.js`; Optimierung sips max. 2000 px.
- Hero: `assets/hero.jpg` ← `aussen/54bb070c-…` (Terrasse, Wasserblick).
- `scripts/build-airbnb-assets.py` für Re-Build nach Archiv-Änderungen.
- `index.html`: 6 statische Galerie-Platzhalter entfernt; `#galleryGrid` per JS befüllt.
- `script.js`: `initAirbnbGallery()` mit `.gallery-tile-caption` (Ghosting-Fix kompatibel).
- `assets/bg/`: aus Airbnb-Quellen (u. a. Nordlichter für `#preise`).
- Entfernt: alte Einzel-JPGs in `assets/` (haus-aussen, wohnzimmer, …).
- Lightbox: getrennte Gruppen `hero`, `grundriss`, `galerie` (seit 30.05.2026); zuvor eine gemeinsame Slideshow.
- Keine Änderungen außerhalb des Projektordners.

## 2026-05-27 - Galerie-Beschriftungen ohne Ghosting

- Nutzerwunsch (27.05.2026): Unter Galerie-Kacheln (z. B. „Schlafzimmer“) schimmert anderer Beschriftungstext durch (z. B. „Bad“ / „Badezimmer“).
- Ursache: (1) Alle `.gallery-tile h3` hatten `z-index: 1` ohne Stacking-Isolation – bei 117 Airbnb-Kacheln überlagerten sich Beschriftungen global (z. B. „Badezimmer“ unter „Schlafzimmer“). (2) Der halbtransparente Vollflächen-Gradient (`::after`) ließ zudem Bildinhalte (z. B. Raumbeschriftungen auf der Übersichts-Kachel) durchscheinen.
- Fix: `isolation: isolate` auf `.gallery-tile`; ein Caption-Block `.gallery-tile-caption` mit eigenem undurchsichtigerem Verlauf statt tile-weitem `::after`; `script.js` erzeugt pro Kachel genau eine Beschriftung in diesem Block (auch Upload-Vorschau).

## 2026-05-27 - Grundrisse, Lightbox und Hintergrund-Fotos

- Nutzerwunsch: (1) Grundrisse-Links in der Galerie reparieren – Dateien aus `assets/haus-fotos/Unterlagen_zum_Haus/` nach `assets/plaene/` mit webfreundlichen Namen; relative Pfade für lokales Öffnen von `index.html`. (2) Lightbox für Hero und Galerie mit prev/next, ESC und Klick außerhalb. (3) Dezente Hintergrund-Einblendung mehrerer Haus-Fotos in Sektionen.
- Pläne geprüft und bestätigt in `assets/plaene/`:
  - `grundriss-erdgeschoss.jpg` ← `Unterlagen_zum_Haus/Grundrisse/Erdgeschoß 3D.jpg`
  - `grundriss-dachgeschoss.jpg` ← `Unterlagen_zum_Haus/Grundrisse/Dachgeschoß 3D.jpg`
  - `planskizze-savio-lodge.pdf` / `.jpg` ← Planskizze Savio Lodge
  - `lageplan0.png` … `lageplan3.png` (Archiv, nicht auf der Seite verlinkt)
- `index.html`: Erd-/Dachgeschoss als Lightbox-Buttons (kein `target="_blank"` – zuverlässiger bei `file://`); PDF weiterhin `target="_blank"`. Galerie-Kacheln und Hero klickbar (`lightbox-trigger`). Sektionen `#haus`, `#highlights`, `#ausstattung`, `#preise`, `#bewertungen`, `#lage` mit `section-has-bg` und `data-bg`.
- `script.js`: Lightbox (Dialog, Tastatur ←/→/Esc, Prev/Next, Klick auf Backdrop); Lazy-Load der Sektions-Hintergründe per `IntersectionObserver`; Upload-Vorschau-Bilder ebenfalls lightbox-fähig.
- `styles.css`: Lightbox-Design (dunkler Overlay, Serif-Bildunterschrift, dezente Nav-Buttons); `.section-has-bg` mit halbtransparentem Foto-Layer (~8 % Opazität) und hellem Verlauf darüber; Galerie-/Hero-Zoom-Cursor.
- Neue Hintergrundbilder in `assets/bg/` (1400 px, optimiert): `bg-wasser.jpg`, `bg-aussen.jpg`, `bg-wohnzimmer.jpg`, `bg-nordlichter.jpg`, `bg-sauna.jpg`, `bg-landschaft.jpg` – aus Gastgeber-Archiv.
- `assets/README.md`, `README.md` aktualisiert. Keine Änderungen außerhalb des Projektordners.

## 2026-05-27 - Gastgeber-Fotos und Pläne aus Dropbox

- Nutzerwunsch: ZIP von Dropbox laden, entpacken, beste Haus-Fotos in Website integrieren (Hero, Galerie), Pläne verlinken oder dokumentieren, READMEs aktualisieren.
- Download erfolgreich: `kirkenes_bilder_plaene.zip` (~64 MB) → `assets/kirkenes_bilder_plaene.zip`, entpackt nach `assets/haus-fotos/`.
- Inhalt: **230 Bilddateien** (JPEG/PNG), strukturiert in `bilder/jaana/` (Außen, Wohnzimmer, Nordlichter, Weihnachten) und `bilder/von_airbnb/` (Räume); plus `Unterlagen_zum_Haus/` (Grundrisse, Lageplan, Baupläne, Keller-Fotos).
- Website-Integration (7 Bilder in `assets/`):
  - Hero: `hero.jpg` ← `jaana/outside/018.jpeg`
  - Galerie: `haus-aussen.jpg`, `wohnzimmer.jpg`, `schlafzimmer.jpg`, `kueche.jpg`, `neiden-umgebung.jpg`, `nordlichter.jpg`
- Pläne: Kopie nach `assets/plaene/` (webfreundliche Namen); Links in Galerie-Sektion zu Erd-/Dachgeschoss und Planskizze-PDF; Rest im Archiv dokumentiert in `assets/README.md`.
- `index.html`: Hero mit `<img>`, Galerie-Platzhalter durch echte `<img>`-Kacheln ersetzt; Upload-Vorschau unverändert.
- `styles.css`: `.hero-media--photo`, `.hero-media-image`, Galerie-Overlay für Lesbarkeit, `.plans-note`.
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Kombi-Auto: Nutzerfoto VW Passat Variant

- Nutzerwunsch (27.05.2026): Eigenes Foto für die **Kombi/Mittelklasse-Auto-Karte** in `#anreise` – silber-grauer **VW Passat Variant** auf verschneiter Straße im Wald, Kennzeichen WOB DC 211.
- Bild aus Cursor-Chat-Anhang gefunden und als `assets/car-kombi.jpg` gespeichert (bestehende Stockfoto-Datei ersetzt).
- `index.html`: `alt`-Text → „VW Passat Variant Kombi auf verschneiter Straße, Norwegen“; Pfad unverändert `assets/car-kombi.jpg`.
- Quelle in `assets/README.md` dokumentiert; CSS unverändert (`object-fit: cover`).
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Kompakt-Auto: Nutzerfoto MG4 Electric

- Nutzerwunsch (27.05.2026): Eigenes Foto für die **Kompakt-Auto-Karte** in `#anreise` – orangefarbener **MG4 Electric** auf Schnee, norwegisches Kennzeichen, Winterlandschaft mit Bergen.
- Bild aus Cursor-Chat-Anhang gefunden und als `assets/car-kompakt.jpg` gespeichert (bestehende Stockfoto-Datei ersetzt).
- `index.html`: `alt`-Text → „MG4 Electric Kompaktwagen im Schnee, Norwegen“; Pfad unverändert `assets/car-kompakt.jpg`.
- Quelle in `assets/README.md` dokumentiert; CSS unverändert (`object-fit: cover`).
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Autokarten: Bild 1 und 3 ersetzt

- Nutzerwunsch (27.05.2026): In der 3er-Autokarten-Sektion sollen das **1.** und **3.** Bild durch Motive ersetzt werden, auf denen das Auto klarer sichtbar ist (Winter/kalte Umgebung beibehalten).
- Umgesetzt in `assets/`: `car-kompakt.jpg` und `car-kombi.jpg` lokal ersetzt (Dateinamen unverändert, kein Refactoring nötig).
- `index.html`: `alt`-Texte der beiden betroffenen `<img>`-Elemente präzisiert; Layout und Struktur unverändert.
- Quellen dokumentiert in `assets/README.md`:
  - `car-kompakt.jpg` → Pexels [849835](https://www.pexels.com/photo/blue-sedan-on-snow-at-daytime-849835/)
  - `car-kombi.jpg` → Unsplash [2BpCb_YriPw](https://unsplash.com/photos/a-couple-of-cars-that-are-parked-in-the-snow-2BpCb_YriPw)
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Textupdate Wohnbereich und Badezimmer

- Nutzerwunsch (27.05.2026): In `index.html` beim Wohnbereich klar kenntlich machen, dass es **Kamin innen** und **eine Feuerstelle draußen** gibt; im Badezimmer den Text von „Ein Föhn ist verfügbar“ auf **„Föhn verfügbar“** ändern.
- Umgesetzt in `#highlights` und `#ausstattung`:
  - Highlight „Sauna & Kamin“ ergänzt um „Kamin innen und Feuerstelle draußen“.
  - Wohnbereich-Liste präzisiert: „Kamin innen (Fireplace)“ und zusätzlicher Punkt „Feuerstelle draußen“.
  - Badezimmer-Liste: „Ein Föhn ist verfügbar“ → „Föhn verfügbar“.
- `README.md` mit kurzem Stand-Eintrag ergänzt; keine Layoutänderungen, nur Textkorrekturen.
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Ausstattungstexte Schlafzimmer/Badezimmer

- Nutzerwunsch (27.05.2026): In `index.html` bei **Schlafzimmer** „Bettwäsche ist enthalten“ ergänzen, **Stauraum** entfernen; bei **Badezimmer** ergänzen, dass **Handtücher vorhanden** sind und **ein Föhn** verfügbar ist.
- Umgesetzt in der Ausstattungssektion (`#ausstattung`):
  - Schlafzimmer: „Bettwäsche – Auf Anfrage“ ersetzt durch „Bettwäsche ist enthalten“; „Stauraum – Auf Anfrage“ entfernt.
  - Badezimmer: „Handtücher – Auf Anfrage“ und „Haartrockner – Auf Anfrage“ ersetzt durch „Handtücher sind vorhanden“ und „Ein Föhn ist verfügbar“.
- Konsistenzupdate in `README.md`: aktueller Stand ergänzt und Liste der offenen `data-todo`-Felder um Bettwäsche/Handtücher bereinigt.
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Anreise: Winter-Mietwagen-Fotos

- Nutzerwunsch: Die drei Mietwagen-Fotos in `#anreise` sollen **Winter/Schnee/Norwegen-Arktis** zeigen – nicht sonnige Grand-Canyon-Atmosphäre.
- Ersetzt in `assets/` (lokal per curl, 800×450 bzw. SUV 800×533):
  - `car-kompakt.jpg` → Unsplash [uwdJRCtgLRI](https://unsplash.com/photos/white-car-behind-a-truck-on-snowy-road-uwdJRCtgLRI) (verschneite Straße, Tromsø/Norwegen)
  - `car-suv.jpg` → Pexels [12875](https://www.pexels.com/photo/white-suv-on-road-near-snow-covered-trees-12875/) (weißer SUV, Schneesturm, schneebedeckte Bäume)
  - `car-kombi.jpg` → Pexels [6513980](https://www.pexels.com/photo/side-view-of-a-snow-covered-van-6513980/) (schneebedeckter Van/Kombi-Stimmung)
- `index.html`: `alt`-Texte auf Deutsch (Winter, Norwegen, Mietwagen).
- `styles.css`: unverändert (`object-fit: cover` reicht).
- `assets/README.md`, `README.md` aktualisiert. Keine Änderungen außerhalb `Kirkenes Haus`.

## 2026-05-27 - Anreise: Auto-Fotos und EUR-Richtpreise

- Nutzerwunsch: In `#anreise` bei den drei Beispiel-Autos (Yaris Kompakt, RAV4 SUV, Passat Kombi) **Fotos** einfügen und **Preise in Euro** statt NOK anzeigen; Disclaimer (Richtpreise, Flughafen KKN) beibehalten.
- Bilder in `assets/`: `car-kompakt.jpg`, `car-suv.jpg`, `car-kombi.jpg` – lizenzfreie Stockfotos (ursprünglich sonnige Motive; siehe Eintrag „Winter-Mietwagen-Fotos“ oben für Winter-Ersatz).
- `index.html`: Platzhalter-Gradienten und ◇-Icons durch `<img>` mit `alt`-Text ersetzt; `loading="lazy"`.
- `styles.css`: `.car-card-visual` mit `aspect-ratio: 16/10`, `img` mit `object-fit: cover`; alte `data-car`-Gradienten entfernt.
- EUR-Umrechnung (ca., Kurs 1 EUR ≈ 11,5 NOK, Mai 2026): Kompakt 750/4.200 NOK → ab 65 €/Tag · 365 €/Woche; SUV 1.100/6.500 → 95 € · 565 €; Kombi 950/5.600 → 83 € · 490 €.
- Disclaimer ergänzt: Richtwerte in EUR, Wechselkurs-Hinweis, Buchung am Flughafen Kirkenes.
- `assets/README.md`, `README.md` aktualisiert. Keine Änderungen außerhalb `Kirkenes Haus`.

## 2026-05-27 - Ortsangabe Sør-Varanger, Postleitzahl entfernt

- Nutzerwunsch: **Neiden** in sichtbaren Ortsangaben durch **Sør-Varanger** ersetzen; **Postleitzahl 9930** aus Adressen, Texten und Meta entfernen.
- Umgesetzt in `index.html`:
  - Meta-Description, Hero, Willkommenstext, Highlights, Ausstattung, Galerie-Überschrift, Lage-Sektion, Anreise-Texte, Footer.
  - Sichtbare Adresse durchgängig: **Vaggeveien 12, Sør-Varanger, Norwegen** (ohne PLZ).
  - Google-Maps-Link und iframe-`src` funktional unverändert (URLs weiterhin mit PLZ/Neiden für Geocoding); iframe-`title` ohne PLZ.
  - Dateiname `assets/neiden-umgebung.jpg` unverändert (Asset-Pfad).
- `styles.css` und `script.js`: keine Änderung (keine Neiden/9930-Vorkommen).
- README und dieses Protokoll ergänzt.

## 2026-05-27 - Anreise-Text: Finnland statt Russland-Nähe

- Nutzerwunsch: In `#anreise` Formulierungen zu Russland/Grenzregion durch positiven, verkaufsstarken Text über **Reisen nach Finnland** und die finnische Grenzregion ersetzen (Tagesausflüge, Einkaufen in Kirkenes, Ausflüge in die finnische Nachbarschaft).
- Umgesetzt in `index.html` (`#anreise`), nur betroffene Fließtexte:
  - Einleitung unter der Überschrift: „durch die arktische Grenzregion“ → „in unmittelbarer Nähe zur finnischen Grenze und perfekt als Basis für Ausflüge nach Finnland“.
  - Verkaufstext im Intro: „Grenzregion und Russland-Nähe erleben“ → „Tagesausflüge in die finnische Nachbarschaft und die Grenzregion Richtung Nordkap genießen“.
- Design, Mietwagen-Karten, Anbieter-Streifen und restliche Anreise-Sektion unverändert.
- Keine Änderungen außerhalb des Projektordners `Kirkenes Haus`.

## 2026-05-27 - Preise: Wochenpreis ca. 2.000 €

- Nutzerinfo: **1 Woche Aufenthalt kostet ca. 2.000 Euro** (Richtwert vom Gastgeber).
- Umgesetzt in `index.html` (`#preise`):
  - Einleitungstext: unverbindliche Richtpreise in EUR, Saisonabweichungen möglich.
  - Highlight-Karte **Nordlicht &amp; Winter** (`price-card--featured`): ca. 2.000 € / Woche, mit Zusatzzeile ca. 286 € pro Nacht · 7 Nächte.
  - Karten Nebensaison und Sommer: ca. 286 € / Nacht (abgeleitet aus Wochenpreis ÷ 7, gerundet).
  - NOK-Platzhalter und `data-todo`-Attribute an den Preis-Karten entfernt.
  - Mindestaufenthalt **2 Nächte** unverändert; Reinigungsgebühr, Kinder, Haustiere weiter „Auf Anfrage“ / Platzhalter.
- `styles.css`: Klasse `.price-note` für die Nachtpreis-Zeile unter dem Wochenpreis (inkl. Featured-Karte).
- Entscheidung: Keine erfundenen Saison-Differenzierungen – ein Richtwert, leicht als „ca.“ gekennzeichnet; finale Saisonpreise bleiben offen.

## 2026-05-27 - Sektion Anreise (Mietwagen am Flughafen KKN)

- Nutzerwunsch: Neue Sektion **„Anreise“** mit positiver Empfehlung, Auto am Flughafen Kirkenes (KKN) zu mieten – besonders sinnvoll für die Lodge in Neiden.
- Recherche (Mai 2026): Anbieter am KKN u. a. Avis, Hertz, Sixt, Europcar, Budget, Thrifty, National/Enterprise (Vergleichsportale: DiscoverCars, autoprio.no, momondo, KAYAK). Richtpreise stark saisonabhängig; Tagesmittel oft ca. 900–1.200 NOK, Einsteigerangebote ab ca. 650–750 NOK/Tag (DiscoverCars/autoprio).
- Umgesetzt in `index.html`: Sektion `#anreise` zwischen `#lage` und `#buchung`; Nav + Footer-Link. Inhalt: Empfehlungs-Box, Verkaufstext (Freiheit, Natur, Kirkenes-Einkauf, Gruppen/Familien, Winter/Sommer), Anbieter-Streifen, drei Beispielautos (Kompakt, SUV/4×4 als Highlight, Kombi) mit Platzhalter-Grafiken und Wochen-/Tagespreisen als **Schätzwerte**.
- Beispielpreise (Schätzung, Stand Mai 2026): Kompakt ab 750 NOK/Tag · 4.200 NOK/Woche; SUV ab 1.100 / 6.500; Kombi ab 950 / 5.600. Disclaimer mit Quellenhinweis in der Sektion.
- `styles.css`: Klassen für Empfehlungs-Box, Anbieterliste, Auto-Karten-Grid, Preiszeilen, Tipps, Disclaimer; responsive 1-spaltig unter 768px.
- Entscheidung: Preise bewusst als „ca.“ / „ab“ kennzeichnen – keine Live-Preise im statischen Prototyp.

## 2026-05-27 - Google-Maps-Links in Lage-Sektion

- Nutzerwunsch: Zwei Google-Maps-Links im Entfernungs-Grid der Lage-Sektion einfügen.
- Umgesetzt in `index.html` (`#lage`, `.distance-grid`):
  - **Kirkenes · Einkaufen** → Google Maps „Kirkenes, Norwegen“ (Einkaufsmöglichkeiten).
  - **Flughafen Kirkenes** → Google Maps „Flughafen Kirkenes“.
- Platzhalter `data-todo="dist-zentrum"` und `data-todo="dist-flughafen"` entfernt; Kacheln zeigen „Google Maps“ als klickbaren Link (`target="_blank"`, `rel="noopener noreferrer"`).
- `styles.css`: Klasse `.distance-map-link` für Hover/Fokus in Akzentfarbe.
- Entfernungs-Kacheln **Natur &amp; Ausflüge** und **Grenzregion** bleiben mit `—` und `data-todo` offen.
- `aria-label` des Grids von „Entfernungen Platzhalter“ auf „Anfahrt und Umgebung“ geändert.

## 2026-05-27 - Sterne-Dekoration entfernt

- Nutzerwunsch: die 5-Sterne-Anzeige (Dekoration/Rating) vollständig von der Website entfernen.
- Entfernt aus `index.html`: Hero-Zeile `.stars` („Bewertung folgt“) sowie je eine `.stars-small`-Zeile in allen drei Bewertungs-Blockquotes.
- Entfernt aus `styles.css`: Regeln für `.stars` und `.stars-small`.
- `script.js`: keine Stern-Logik vorhanden, keine Änderung.
- Layout bleibt ohne Lücken: Hero beginnt direkt mit Eyebrow; Bewertungskarten zeigen nur Zitat und Quelle.

## 2026-05-27 - Sichtbarer Markenname: Lodge in der Arktis

- Nutzerwunsch: sichtbarer Name auf der Website von „Kirkenes Haus“ (ggf. „Kirkeness Haus“) zu **„Lodge in der Arktis“** umbenennen.
- Umgesetzt in `index.html`: `<title>`, Logo/Navigation, Hero-`<h1>`, Footer-Marke und Copyright-Zeile.
- `styles.css` und `script.js`: keine Marken-Vorkommen (nur Layout/Interaktion).
- **Projektordner** `Kirkenes Haus` und Dateipfade bleiben unverändert; Ortsbezug „Kirkenes“ (Stadt/Flughafen/Region) in Lage- und Reisetexten bleibt erhalten.
- README und dieses Protokoll ergänzt.

## 2026-05-27 - Hausdaten in Website eingepflegt

- Gastgeber-Daten in `index.html` übernommen: max. 10 Gäste, 3 Schlafzimmer, 7 Betten, 3 Badezimmer, Mindestaufenthalt 2 Nächte.
- Lage: **Vaggeveien 12, 9930 Neiden, Norwegen** (Projektordner „Kirkenes Haus“; sichtbarer Markenname seit 27.05.2026: „Lodge in der Arktis“; Lage-Texte: Neiden bei Kirkenes).
- Google Maps: Link zur Adresse + iframe-Einbettung (`maps.google.com` mit Adress-Query).
- Highlights und Ausstattung mit bestätigten Merkmalen (Sauna, Kamin, Terrasse, Balkon, WLAN/Glasfaser, Parkplatz, TV, Küche, Workspace, Waschmaschine, direkt am Wasser).
- Hero, Willkommenstext, Footer und Buchungsformular (`max="10"` Gäste) angepasst.
- Bewusst offen gelassen: m², Haustyp, Nachtpreise, Reinigungsgebühr, Kontaktdaten, Entfernungs-Grid (seit 27.05.2026: Kirkenes/Einkaufen und Flughafen verlinkt; Natur/Grenzregion offen), Galerie-/Hero-Fotos. Check-in/out seit 30.05.2026: ab 16:00 Uhr / 11:00 Uhr.
- `styles.css`: Karten-Einbettung (`.map-embed-wrap`, `.map-embed`) statt Platzhalter-Kachel.

## 2026-05-27 - Design-Anpassung an Ziegelberg-Chalet-Ästhetik

- Referenz-Website analysiert: https://www.ziegelberg-chalets.de/chalet-waldblick (Hero, Quick Facts, Ausstattungsblöcke, Galerie, Preise, Lage, ruhige Luxus-Ästhetik).
- `index.html`, `styles.css`, `script.js` überarbeitet: Vollbild-Hero, Sterne-Dekor, Quick-Facts-Leiste, Highlights, Ausstattungs-Spalten, Galerie-Mosaik, Preis-Karten, Bewertungen, Lage mit Entfernungs-Platzhaltern, Buchungs- und Kontaktformular, Footer.
- Typografie: Google Fonts Cormorant Garamond (Überschriften) + Source Sans 3 (Fließtext).
- Farbwelt: warmes Off-White, dunkles Anthrazit, dezentes Bronze/Gold – nicht 1:1 Ziegelberg, aber gleiche Design-Sprache.
- Airbnb-Inserat https://www.airbnb.de/rooms/1504531054030942935: keine zuverlässigen Bild-URLs per WebFetch; **kein Hotlinking**. Platzhalter in Galerie + `assets/README.md` mit Dateinamen-Vorschlägen.
- Unbekannte Hausdaten: Platzhalter „Auf Anfrage“ und `data-todo`-Attribute im HTML; Nutzer soll TODOs abarbeiten.
- Header: transparent über Hero, nach Scroll fest mit hellem Hintergrund (`script.js`).
- Offen: echte Fotos in `assets/`, Adresse für Google-Maps-Einbettung, Kontaktdaten, finale Preise und Hausregeln.

## 2026-05-25 - Projektstart Vermietungswebsite Kirkenes Haus

- Neues Projekt im Ordner `/Users/spassig/Arbeit/Umbuzoo/Coding/Kirkenes Haus` umsetzen.
- Ziel: Vermietungswebsite für ein Haus in Kirkenes, Norwegen.
- Einfache statische Website ohne Build-System bevorzugt: `index.html`, `styles.css`, `script.js`.
- Website soll direkt im Browser geöffnet werden können.
- Sichtbare Website-Texte und Projektdokumentation sollen auf Deutsch sein.
- README als lebende Projektdokumentation anlegen und bei späteren Aufträgen aktualisieren.
- Dieses Ideenprotokoll bei jedem späteren Auftrag zuerst aktualisieren.
- Cursor-Projektregel unter `.cursor/rules/` anlegen, damit künftige Agenten die Pflegepflicht beachten.
- Inhalte für den Website-Prototyp:
  - Hero-Bereich mit klarem Call-to-Action.
  - Kurzbeschreibung von Kirkenes und dem Haus.
  - Verbindung zu Google Maps über Link und Einbettungs-Platzhalter.
  - Unkomplizierte Kontaktaufnahme.
  - Termin- und Buchungsanfragen über die Website.
  - Preise anzeigen.
  - Bilder und eventuell Videos anzeigen.
  - Bilder-/Video-Galerie mit einfachem clientseitigem Upload und Vorschau im Browser.
  - Bewertungen von Gästen anzeigen.
  - Responsive Design für Smartphone, Tablet und Desktop.
- Nutzer soll Medien später unkompliziert selbst hochladen können.
- Hinweis: Dauerhafte Uploads, echte Formularsendung und echte Buchungslogik brauchen später Backend, CMS, Formular-Dienst oder Plattformintegration.
- Airbnb-Referenzlink für Inhalte, Vergleich und Vertrauen:
  - https://www.airbnb.de/rooms/1504531054030942935?adults=1&location=Kirkenes%2C%20Norway&search_mode=regular_search&check_in=2026-04-18&check_out=2026-04-23&children=0&infants=0&pets=0&source_impression_id=p3_1776346968_P3FyxrS-2OUvBdXz&previous_page_section_name=1001
- Marketing- und Plattformideen sollen in `Ideen/marketing-und-plattformen.md` dokumentiert werden.
