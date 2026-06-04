/*
 * i18n.js – Mehrsprachigkeit für die Arctic-Lodge-Website (DE/EN/NO).
 * Deutsch ist Quell- und Standardsprache. Wird VOR script.js geladen.
 *
 * - data-i18n="key"            → setzt textContent
 * - data-i18n-html="key"       → setzt innerHTML (für Texte mit <strong>, <code> …)
 * - data-i18n-placeholder="…"  → setzt das placeholder-Attribut
 * - data-i18n-aria-label="…"   → setzt aria-label
 * - data-i18n-title="…"        → setzt title
 * - data-i18n-alt="…"          → setzt alt
 * - data-i18n-content="…"      → setzt content (Meta-Tags)
 * - data-i18n-caption="…"      → setzt data-lightbox-caption
 *
 * Erkennungsreihenfolge: gespeicherte Wahl → IP-Geolokalisierung (gecacht)
 * → navigator.language → Deutsch.
 */
(function () {
  "use strict";

  const LANGS = ["de", "en", "no"];
  const DEFAULT_LANG = "de";
  const STORAGE_LANG = "kh-lang"; // explizite Nutzerwahl
  const STORAGE_GEO = "kh-geo-lang"; // gecachtes IP-Ergebnis
  const IP_TIMEOUT_MS = 2500;

  const translations = {
    de: {
      "title": "Arctic Lodge | Ferienhaus in Nordnorwegen",
      "meta.description":
        "Ferienhaus in Sør-Varanger bei Kirkenes, Norwegen – direkt am Wasser, mit Sauna und Kamin. Bis zu 10 Gäste, 3 Schlafzimmer.",
      "brand": "Arctic Lodge",

      "nav.logoAria": "Zur Startseite",
      "nav.toggle": "Menü",
      "nav.aria": "Hauptnavigation",
      "nav.haus": "Haus",
      "nav.ausstattung": "Ausstattung",
      "nav.grundriss": "Grundriss",
      "nav.galerie": "Galerie",
      "nav.preise": "Preise",
      "nav.lage": "Lage",
      "nav.anreise": "Anreise",
      "nav.bewertungen": "Bewertungen",
      "nav.kontakt": "Kontakt",
      "nav.cta": "Anfragen",
      "lang.aria": "Sprache wählen",

      "hero.mediaAria": "Arctic Lodge bei Nordlicht – Holzhaus im Schnee in Sør-Varanger",
      "hero.expandAria": "Hero-Bild vergrößern",
      "hero.lightboxCaption": "Arctic Lodge bei Nordlicht – Holzhaus im Schnee in Sør-Varanger",
      "hero.eyebrow": "Ferienhaus · Sør-Varanger bei Kirkenes, Norwegen",
      "hero.title": "Arctic Lodge",
      "hero.lead": "Direkt am Wasser in Sør-Varanger",
      "hero.text":
        "Ein großzügiges Ferienhaus für bis zu 10 Gäste in Sør-Varanger – mit Sauna, Kamin, Terrasse und Balkon am Wasser. Ideal als Basis für Nordlichter, Grenzregion und die Stille des äußersten Nordostens.",
      "hero.cta1": "Verfügbarkeit anfragen",
      "hero.cta2": "Impressionen",

      "haus.title": "Willkommen in Sør-Varanger",
      "haus.lead":
        "Das Haus liegt in Sør-Varanger – am Pasvikelv, etwa eine Autostunde südlich von Kirkenes im äußersten Nordosten Norwegens.",
      "haus.body":
        "Mit 3 Schlafzimmern, 7 Betten, 3 Badezimmern und Platz für bis zu 10 Gäste bietet es einen privaten Rückzugsort direkt am Wasser: Sauna, Kamin, Terrasse, Balkon und schnelles WLAN über Glasfaser. Check-in ab 16:00 Uhr, Check-out um 11:00 Uhr; Mindestaufenthalt 2 Nächte.",
      "facts.quickAria": "Kurzinfos zum Haus",
      "facts.qmValue": "Auf Anfrage",
      "facts.qmLabel": "Quadratmeter",
      "facts.guestsLabel": "Gäste max.",
      "facts.bedroomsLabel": "Schlafzimmer",
      "facts.bathroomsLabel": "Badezimmer",
      "facts.checkinValue": "ab 16:00 Uhr",
      "facts.checkinLabel": "Check-in",
      "facts.checkoutValue": "11:00 Uhr",
      "facts.checkoutLabel": "Check-out",

      "highlights.eyebrow": "Highlights",
      "highlights.title": "Das Haus auf einen Blick",
      "highlights.intro": "Ausgewählte Besonderheiten des Hauses in Sør-Varanger am Wasser.",
      "highlights.card1Title": "Direkt am Wasser",
      "highlights.card1Text": "Lage am Pasvikelv in Sør-Varanger – Wasser, Weitblick und Ruhe vor der Haustür.",
      "highlights.card2Title": "Sauna & Kamin",
      "highlights.card2Text": "Entspannen nach Ausflügen: eigene Sauna, Kamin innen und Feuerstelle draußen.",
      "highlights.card3Title": "Terrasse & Balkon",
      "highlights.card3Text": "Außenbereiche zum Verweilen – mit Blick auf Wasser und nordische Natur.",
      "highlights.card4Title": "WLAN / Glasfaser",
      "highlights.card4Text": "Schnelles Internet für Alltag, Streaming und Homeoffice am Arbeitsplatz.",
      "highlights.card5Title": "Voll ausgestattete Küche",
      "highlights.card5Text": "Küche mit allem Nötigen für längere Aufenthalte und gemeinsames Kochen.",
      "highlights.card6Title": "Parkplatz & TV",
      "highlights.card6Text": "Parkplatz am Haus, Fernseher, Waschmaschine und Arbeitsplatz im Haus.",

      "ausstattung.eyebrow": "Ausstattung",
      "ausstattung.title": "Komfort für Ihren Aufenthalt",
      "ausstattung.intro": "Übersicht der bestätigten Ausstattung – offene Punkte sind als „Auf Anfrage“ gekennzeichnet.",
      "ausstattung.wohnTitle": "Wohnbereich",
      "ausstattung.wohn1": "Gemütliche Sitzecke mit Kamin innen (Fireplace)",
      "ausstattung.wohn2": "Feuerstelle draußen",
      "ausstattung.wohn3": "Fernseher (TV)",
      "ausstattung.wohn4": "Sauna im Haus",
      "ausstattung.kuecheTitle": "Küche",
      "ausstattung.kueche1": "Voll ausgestattete Küche",
      "ausstattung.kueche2": "Geschirr und Küchenutensilien",
      "ausstattung.kueche3": "Kaffeemaschine – Auf Anfrage",
      "ausstattung.schlafTitle": "Schlafzimmer",
      "ausstattung.schlaf1": "3 Schlafzimmer · 7 Betten · max. 10 Gäste",
      "ausstattung.schlaf2": "Bettwäsche ist enthalten",
      "ausstattung.badTitle": "Badezimmer",
      "ausstattung.bad1": "3 Badezimmer",
      "ausstattung.bad2": "Handtücher sind vorhanden",
      "ausstattung.bad3": "Föhn verfügbar",
      "ausstattung.aussenTitle": "Außen & Lage",
      "ausstattung.aussen1": "Terrasse und Balkon",
      "ausstattung.aussen2": "Parkplatz am Haus",
      "ausstattung.aussen3": "Direkt am Wasser · Vaggeveien 12, Sør-Varanger",
      "ausstattung.allgTitle": "Allgemein",
      "ausstattung.allg1": "WLAN / Glasfaser",
      "ausstattung.allg2": "Waschmaschine",
      "ausstattung.allg3": "Arbeitsplatz (Workspace)",
      "ausstattung.allg4": "Check-in ab 16:00 Uhr · Check-out um 11:00 Uhr",
      "ausstattung.allg5": "Haustiere – Auf Anfrage",

      "grundriss.eyebrow": "Grundriss",
      "grundriss.title": "Raumaufteilung der Lodge",
      "grundriss.intro":
        "Erd- und Dachgeschoss auf einen Blick – groß und übersichtlich wie auf einer Chalet-Detailseite. Per Klick vergrößern.",
      "grundriss.plansAria": "Grundrisse der Lodge",
      "grundriss.egAria": "Grundriss Erdgeschoss vergrößern",
      "grundriss.egCaption": "Grundriss Erdgeschoss",
      "grundriss.egFig": "Erdgeschoss",
      "grundriss.dgAria": "Grundriss Dachgeschoss vergrößern",
      "grundriss.dgCaption": "Grundriss Dachgeschoss",
      "grundriss.dgFig": "Dachgeschoss",
      "grundriss.sketchView": "Planskizze ansehen",
      "grundriss.sketchCaption": "Planskizze Savio Lodge",
      "grundriss.pdf": "PDF herunterladen",
      "grundriss.archiveNote":
        "· Weitere Unterlagen im Archiv unter <code>assets/haus-fotos/Unterlagen_zum_Haus/</code>.",

      "galerie.eyebrow": "Galerie",
      "galerie.title": "Impressionen",
      "galerie.filtersAria": "Galerie nach Bereich filtern",
      "galerie.uploadLabel": "Eigene Bilder oder Videos testen",
      "galerie.uploadHint":
        "Prototyp: Vorschau nur im Browser. Für die Live-Website Fotos in <code>assets/</code> ablegen und in der Galerie verlinken.",

      "gallery.all": "Alle",
      "gallery.enlarge": "{title} vergrößern",
      "gallery.cat.aussen": "Außen & Terrasse",
      "gallery.cat.wohnen": "Wohnbereich",
      "gallery.cat.schlafzimmer": "Schlafzimmer",
      "gallery.cat.bad": "Badezimmer",
      "gallery.cat.sauna": "Sauna & Wellness",
      "gallery.cat.aktivitaeten": "Aktivitäten & Umgebung",
      "gallery.room.schlafzimmer-1": "Schlafzimmer 1",
      "gallery.room.schlafzimmer-2": "Schlafzimmer 2",
      "gallery.room.schlafzimmer-3": "Schlafzimmer 3",
      "gallery.room.badezimmer-1": "Badezimmer 1",
      "gallery.room.badezimmer-2": "Badezimmer 2",
      "gallery.room.badezimmer-3": "Badezimmer 3",
      "gallery.emptyLead": "Galerie-Daten konnten nicht geladen werden.",
      "gallery.emptyFile":
        "Beim direkten Öffnen von <code>index.html</code> blockieren manche Browser lokale Skripte. Bitte einen lokalen Server starten, z.&nbsp;B. <code>python3 -m http.server 8000</code>, und <code>http://localhost:8000</code> öffnen.",
      "gallery.emptyGeneric":
        "Bitte prüfen, ob <code>assets/airbnb/gallery-data.js</code> vorhanden ist und die Seite neu laden.",

      "preise.eyebrow": "Preise & Verfügbarkeit",
      "preise.title": "Ihr Aufenthalt",
      "preise.intro":
        "Unverbindliche Richtpreise in Euro (Stand Mai 2026). Saisonale Abweichungen möglich – genaue Beträge per Anfrage oder im Airbnb-Inserat.",
      "preise.card1Title": "Nebensaison",
      "preise.card1Price": "ca. 286 € / Nacht",
      "preise.card1Text": "Für ruhige Reisezeiten und längere Aufenthalte.",
      "preise.card2Title": "Nordlicht & Winter",
      "preise.card2Price": "ca. 2.000 € / Woche",
      "preise.card2Note": "ca. 286 € pro Nacht · 7 Nächte",
      "preise.card2Text": "Beliebte Reisezeit für Schnee, Nordlichter und Wintererlebnisse.",
      "preise.card3Title": "Sommer",
      "preise.card3Price": "ca. 286 € / Nacht",
      "preise.card3Text": "Ideal für Mitternachtssonne, Ausflüge und Natur.",
      "preise.policyTitle": "Hinweise zur Buchung",
      "preise.policy1": "<strong>Mindestaufenthalt:</strong> 2 Nächte.",
      "preise.policy2": "<strong>Check-in:</strong> ab 16:00 Uhr.",
      "preise.policy3": "<strong>Check-out:</strong> 11:00 Uhr.",
      "preise.policy4": "<strong>Reinigungsgebühr:</strong> Auf Anfrage.",
      "preise.policy5": "<strong>Kinder:</strong> Regelung bitte vom Gastgeber ergänzen.",
      "preise.policy6": "<strong>Haustiere:</strong> Auf Anfrage.",

      "bewertungen.eyebrow": "Gästestimmen",
      "bewertungen.title": "Bewertungen",
      "bewertungen.intro":
        "Beispielzitate – später durch freigegebene Bewertungen aus Airbnb oder Direktbuchungen ersetzen.",
      "bewertungen.q1": "„Ein ruhiger Ort, perfekt nach einem Tag voller Ausflüge rund um Kirkenes.“",
      "bewertungen.q2": "„Sehr gute Basis für Nordlichter, Natur und entspannte Abende im Haus.“",
      "bewertungen.q3": "„Unkomplizierte Kommunikation und alles Wichtige schnell erreichbar.“",
      "bewertungen.cite": "Beispielbewertung ·",

      "lage.eyebrow": "Anfahrt & Lage",
      "lage.title": "Sør-Varanger bei Kirkenes",
      "lage.body":
        "Das Haus liegt in Sør-Varanger an der Vaggeveien 12, direkt am Wasser am Pasvikelv. Kirkenes mit Flughafen und Einkaufsmöglichkeiten ist per Auto gut erreichbar.",
      "lage.address": "<strong>Adresse:</strong> Vaggeveien 12, Sør-Varanger, Norwegen",
      "lage.routeBtn": "Route auf Google Maps",
      "lage.distAria": "Anfahrt und Umgebung",
      "lage.dist1Aria": "Kirkenes auf Google Maps öffnen (Einkaufsmöglichkeiten)",
      "lage.dist1Label": "Kirkenes · Einkaufen",
      "lage.dist2Aria": "Flughafen Kirkenes auf Google Maps öffnen",
      "lage.dist2Label": "Flughafen Kirkenes",
      "lage.dist3Label": "Natur & Ausflüge",
      "lage.dist4Label": "Grenzregion",
      "lage.mapTitle": "Karte: Vaggeveien 12, Sør-Varanger, Norwegen",

      "anreise.eyebrow": "Anreise",
      "anreise.title": "Mit dem Mietwagen frei unterwegs",
      "anreise.intro":
        "Von Kirkenes nach Sør-Varanger – in unmittelbarer Nähe zur finnischen Grenze und perfekt als Basis für Ausflüge nach Finnland. Ein eigenes Auto macht Ihren Aufenthalt deutlich entspannter.",
      "anreise.recommendLabel": "Unsere Empfehlung",
      "anreise.recommend":
        "<strong>Für dieses Ferienhaus empfehlen wir ausdrücklich, ein Auto zu mieten</strong> – idealerweise direkt am Flughafen Kirkenes (KKN / Høybuktmoen) bei Ankunft abholen und bei Abreise zurückgeben.",
      "anreise.intro1":
        "Die Lodge liegt in Sør-Varanger am Pasvikelv – etwa <strong>45–60 Minuten mit dem Auto</strong> südlich von Kirkenes. Öffentliche Verbindungen sind dünn; mit dem Mietwagen sind Sie unabhängig: Nordlichter jagen, Fjorde und Tundra erkunden, in Kirkenes einkaufen, Tagesausflüge in die finnische Nachbarschaft und die Grenzregion Richtung Nordkap genießen – im Winter wie im Sommer, ohne auf Busfahrpläne zu warten.",
      "anreise.intro2":
        "Besonders für <strong>Familien und Gruppen bis 10 Personen</strong> lohnt sich die Flexibilität: gemeinsam anreisen, Einkäufe transportieren, Ausflüge spontan planen. Am Flughafen Kirkenes stehen mehrere große Ketten und lokale Partner bereit – Abholung in der Ankunftshalle, Rückgabe vor dem Abflug, oft in wenigen Minuten erledigt.",
      "anreise.providerAria": "Mietwagen-Anbieter am Flughafen Kirkenes",
      "anreise.providerTitle": "Am Flughafen KKN buchbar u. a. bei",
      "anreise.carGridAria": "Beispiel-Fahrzeuge und Richtpreise",
      "anreise.perDay": "ca. pro Tag",
      "anreise.perWeek": "ca. pro Woche",
      "anreise.car1Cat": "Kompaktklasse",
      "anreise.car1Title": "Kleinwagen · z. B. Toyota Yaris",
      "anreise.car1Text":
        "Sparsam für Paare oder kleine Familien – gut für Sommerstraßen und den Weg Kirkenes ↔ Sør-Varanger.",
      "anreise.car1Alt": "MG4 Electric Kompaktwagen im Schnee, Norwegen",
      "anreise.car1Day": "ab 65 €",
      "anreise.car1Week": "ab 365 €",
      "anreise.car1Link": "Am Flughafen Kirkenes buchbar · Budget",
      "anreise.car2Cat": "SUV / 4×4",
      "anreise.car2Title": "Geländetauglich · z. B. Toyota RAV4",
      "anreise.car2Text":
        "Unsere Top-Empfehlung für Winter, Schnee und längere Touren in der Arktis – mehr Komfort und Sicherheitsgefühl auf norwegischen Straßen.",
      "anreise.car2Alt": "SUV auf verschneiter Straße zwischen schneebedeckten Bäumen – Winterfahrt in Norwegen",
      "anreise.car2Day": "ab 95 €",
      "anreise.car2Week": "ab 565 €",
      "anreise.car2Link": "Am Flughafen Kirkenes buchbar · Hertz",
      "anreise.car3Cat": "Kombi / Mittelklasse",
      "anreise.car3Title": "Stationswagen · z. B. VW Passat Variant",
      "anreise.car3Text":
        "Viel Kofferraum für Vorräte aus Kirkenes, Kindersitze und Gepäck – ideal für Gruppen mit mehr Gepäck, ohne Minibus.",
      "anreise.car3Alt": "VW Passat Variant Kombi auf verschneiter Straße, Norwegen",
      "anreise.car3Day": "ab 83 €",
      "anreise.car3Week": "ab 490 €",
      "anreise.car3Link": "Am Flughafen Kirkenes buchbar · Europcar",
      "anreise.tipsTitle": "Praktische Hinweise",
      "anreise.tip1":
        "<strong>Flughafen:</strong> Kirkenes Airport Høybuktmoen (KKN) – Mietwagen-Schalter in der Ankunftshalle; Vergleichsportale: DiscoverCars, autoprio.no, momondo.no.",
      "anreise.tip2":
        "<strong>Fahrt zur Lodge:</strong> ca. 45–60 Min. nach Sør-Varanger (Vaggeveien 12) – Route über E6/E105; im Winter Winterreifen/4×4 erwägen.",
      "anreise.tip3":
        "<strong>Früh buchen:</strong> In der Nordlicht-Saison (Okt.–März) und im Sommer sind Fahrzeuge schnell ausgebucht – Reservierung einige Wochen im Voraus lohnt sich.",
      "anreise.disclaimer":
        "Alle Preise sind <strong>unverbindliche Richtwerte in Euro</strong> (Schätzungen, als „ca.“ gekennzeichnet) für 2025/2026 – umgerechnet aus norwegischen Angeboten mit Wechselkurs ca. <strong>1 EUR ≈ 11,5 NOK</strong> (Stand Mai 2026). Abhängig von Saison, Versicherung, Kilometerpaket und Buchungszeitpunkt. Recherche u. a. DiscoverCars.no, autoprio.no, Budget.no, KAYAK; am Flughafen Kirkenes buchbar. Bitte aktuelle Preise direkt beim Anbieter prüfen.",

      "buchung.eyebrow": "Buchung",
      "buchung.title": "Verfügbarkeit anfragen",
      "buchung.intro":
        "Unverbindliche Anfrage – wir melden uns persönlich bei Ihnen zurück. Nach dem Absenden erhalten Sie eine Bestätigung.",
      "form.name": "Name",
      "form.email": "E-Mail",
      "form.message": "Nachricht",
      "buchung.arrival": "Anreise",
      "buchung.departure": "Abreise",
      "buchung.guests": "Gäste",
      "buchung.requestType": "Anfrageart",
      "buchung.opt1": "Buchungsanfrage",
      "buchung.opt2": "Termin für Rückruf",
      "buchung.opt3": "Allgemeine Frage",
      "buchung.messagePlaceholder": "Wunschzeitraum, Fragen oder besondere Hinweise",
      "buchung.submit": "Anfrage senden",

      "kontakt.eyebrow": "Kontakt",
      "kontakt.title": "Persönlich erreichbar",
      "kontakt.intro":
        "Telefon, E-Mail oder WhatsApp folgen in Kürze. Für Vertrauen verweisen wir zusätzlich auf das bestehende Airbnb-Inserat – oder schreiben Sie uns direkt über das Formular.",
      "kontakt.email": "<strong>E-Mail:</strong> Auf Anfrage",
      "kontakt.phone": "<strong>Telefon:</strong> Auf Anfrage",
      "kontakt.whatsapp": "<strong>WhatsApp:</strong> Auf Anfrage",
      "kontakt.airbnbBtn": "Airbnb-Inserat öffnen",
      "kontakt.formTitle": "Nachricht senden",
      "kontakt.subject": "Betreff",
      "kontakt.subjectPlaceholder": "Frage zum Haus oder zur Lage",
      "kontakt.submit": "Nachricht senden",

      "footer.address": "Vaggeveien 12 · Sør-Varanger, Norwegen",
      "footer.checkinout": "Check-in ab 16:00 Uhr · Check-out um 11:00 Uhr",
      "footer.navAria": "Footer",
      "footer.top": "Nach oben",
      "footer.copy": "© 2026 Arctic Lodge · Prototyp für eine Vermietungs-Website",

      "form.sending": "Wird gesendet …",
      "form.success": "Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns so bald wie möglich.",
      "form.error":
        "Beim Senden ist ein Fehler aufgetreten. Bitte später erneut versuchen oder schreiben Sie uns per E-Mail.",
      "form.mailtoHint":
        "Hinweis: Der echte Versand braucht noch einen Web3Forms-Key. Wir haben Ihre E-Mail-App mit einer vorausgefüllten Nachricht geöffnet – bitte einfach abschicken.",
      "form.subjectBooking": "Neue Buchungsanfrage – Arctic Lodge",
      "form.subjectContact": "Kontaktanfrage – Arctic Lodge",

      "autoreply.subject": "Danke für Ihre Anfrage – Arctic Lodge",
      "autoreply.message":
        "Vielen Dank für Ihre Anfrage bei der Arctic Lodge in Sør-Varanger! Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich persönlich bei Ihnen zurück. Bei dringenden Fragen können Sie gern direkt auf diese E-Mail antworten.\n\nHerzliche Grüße\nIhr Arctic Lodge Team",

      "lightbox.aria": "Bildvorschau",
      "lightbox.close": "Schließen",
      "lightbox.prev": "Vorheriges Bild",
      "lightbox.next": "Nächstes Bild",
    },

    en: {
      "title": "Arctic Lodge | Holiday Home in Northern Norway",
      "meta.description":
        "Holiday home in Sør-Varanger near Kirkenes, Norway – right by the water, with sauna and fireplace. Up to 10 guests, 3 bedrooms.",
      "brand": "Arctic Lodge",

      "nav.logoAria": "To homepage",
      "nav.toggle": "Menu",
      "nav.aria": "Main navigation",
      "nav.haus": "House",
      "nav.ausstattung": "Amenities",
      "nav.grundriss": "Floor plan",
      "nav.galerie": "Gallery",
      "nav.preise": "Prices",
      "nav.lage": "Location",
      "nav.anreise": "Getting here",
      "nav.bewertungen": "Reviews",
      "nav.kontakt": "Contact",
      "nav.cta": "Enquire",
      "lang.aria": "Choose language",

      "hero.mediaAria": "Arctic Lodge under the northern lights – timber cabin in the snow in Sør-Varanger",
      "hero.expandAria": "Enlarge hero image",
      "hero.lightboxCaption": "Arctic Lodge under the northern lights – timber cabin in the snow in Sør-Varanger",
      "hero.eyebrow": "Holiday home · Sør-Varanger near Kirkenes, Norway",
      "hero.title": "Arctic Lodge",
      "hero.lead": "Right by the water in Sør-Varanger",
      "hero.text":
        "A spacious holiday home for up to 10 guests in Sør-Varanger – with sauna, fireplace, terrace and balcony by the water. The ideal base for the northern lights, the border region and the silence of the far northeast.",
      "hero.cta1": "Check availability",
      "hero.cta2": "Gallery",

      "haus.title": "Welcome to Sør-Varanger",
      "haus.lead":
        "The house is located in Sør-Varanger – on the Pasvikelv, about an hour's drive south of Kirkenes in the far northeast of Norway.",
      "haus.body":
        "With 3 bedrooms, 7 beds, 3 bathrooms and room for up to 10 guests, it offers a private retreat right by the water: sauna, fireplace, terrace, balcony and fast Wi-Fi over fibre. Check-in from 16:00, check-out at 11:00; minimum stay 2 nights.",
      "facts.quickAria": "Quick facts about the house",
      "facts.qmValue": "On request",
      "facts.qmLabel": "Square metres",
      "facts.guestsLabel": "Guests max.",
      "facts.bedroomsLabel": "Bedrooms",
      "facts.bathroomsLabel": "Bathrooms",
      "facts.checkinValue": "from 16:00",
      "facts.checkinLabel": "Check-in",
      "facts.checkoutValue": "11:00",
      "facts.checkoutLabel": "Check-out",

      "highlights.eyebrow": "Highlights",
      "highlights.title": "The house at a glance",
      "highlights.intro": "Selected features of the house by the water in Sør-Varanger.",
      "highlights.card1Title": "Right by the water",
      "highlights.card1Text": "Located on the Pasvikelv in Sør-Varanger – water, wide views and calm right at the doorstep.",
      "highlights.card2Title": "Sauna & fireplace",
      "highlights.card2Text": "Relax after your outings: private sauna, indoor fireplace and an outdoor fire pit.",
      "highlights.card3Title": "Terrace & balcony",
      "highlights.card3Text": "Outdoor spaces to linger – with views of the water and Nordic nature.",
      "highlights.card4Title": "Wi-Fi / fibre",
      "highlights.card4Text": "Fast internet for everyday life, streaming and remote work at the workspace.",
      "highlights.card5Title": "Fully equipped kitchen",
      "highlights.card5Text": "A kitchen with everything you need for longer stays and cooking together.",
      "highlights.card6Title": "Parking & TV",
      "highlights.card6Text": "Parking at the house, television, washing machine and a workspace indoors.",

      "ausstattung.eyebrow": "Amenities",
      "ausstattung.title": "Comfort for your stay",
      "ausstattung.intro": "Overview of confirmed amenities – open items are marked as “on request”.",
      "ausstattung.wohnTitle": "Living area",
      "ausstattung.wohn1": "Cosy seating area with an indoor fireplace",
      "ausstattung.wohn2": "Outdoor fire pit",
      "ausstattung.wohn3": "Television (TV)",
      "ausstattung.wohn4": "Sauna in the house",
      "ausstattung.kuecheTitle": "Kitchen",
      "ausstattung.kueche1": "Fully equipped kitchen",
      "ausstattung.kueche2": "Crockery and kitchen utensils",
      "ausstattung.kueche3": "Coffee machine – on request",
      "ausstattung.schlafTitle": "Bedrooms",
      "ausstattung.schlaf1": "3 bedrooms · 7 beds · max. 10 guests",
      "ausstattung.schlaf2": "Bed linen is included",
      "ausstattung.badTitle": "Bathrooms",
      "ausstattung.bad1": "3 bathrooms",
      "ausstattung.bad2": "Towels are provided",
      "ausstattung.bad3": "Hairdryer available",
      "ausstattung.aussenTitle": "Outside & location",
      "ausstattung.aussen1": "Terrace and balcony",
      "ausstattung.aussen2": "Parking at the house",
      "ausstattung.aussen3": "Right by the water · Vaggeveien 12, Sør-Varanger",
      "ausstattung.allgTitle": "General",
      "ausstattung.allg1": "Wi-Fi / fibre",
      "ausstattung.allg2": "Washing machine",
      "ausstattung.allg3": "Workspace",
      "ausstattung.allg4": "Check-in from 16:00 · check-out at 11:00",
      "ausstattung.allg5": "Pets – on request",

      "grundriss.eyebrow": "Floor plan",
      "grundriss.title": "Layout of the lodge",
      "grundriss.intro":
        "Ground and upper floor at a glance – large and clear, like on a chalet detail page. Click to enlarge.",
      "grundriss.plansAria": "Floor plans of the lodge",
      "grundriss.egAria": "Enlarge ground-floor plan",
      "grundriss.egCaption": "Ground-floor plan",
      "grundriss.egFig": "Ground floor",
      "grundriss.dgAria": "Enlarge upper-floor plan",
      "grundriss.dgCaption": "Upper-floor plan",
      "grundriss.dgFig": "Upper floor",
      "grundriss.sketchView": "View site sketch",
      "grundriss.sketchCaption": "Site sketch – Savio Lodge",
      "grundriss.pdf": "Download PDF",
      "grundriss.archiveNote":
        "· More documents in the archive under <code>assets/haus-fotos/Unterlagen_zum_Haus/</code>.",

      "galerie.eyebrow": "Gallery",
      "galerie.title": "Impressions",
      "galerie.filtersAria": "Filter gallery by area",
      "galerie.uploadLabel": "Try your own images or videos",
      "galerie.uploadHint":
        "Prototype: preview in the browser only. For the live website, place photos in <code>assets/</code> and link them in the gallery.",

      "gallery.all": "All",
      "gallery.enlarge": "Enlarge {title}",
      "gallery.cat.aussen": "Outside & terrace",
      "gallery.cat.wohnen": "Living area",
      "gallery.cat.schlafzimmer": "Bedrooms",
      "gallery.cat.bad": "Bathrooms",
      "gallery.cat.sauna": "Sauna & wellness",
      "gallery.cat.aktivitaeten": "Activities & surroundings",
      "gallery.room.schlafzimmer-1": "Bedroom 1",
      "gallery.room.schlafzimmer-2": "Bedroom 2",
      "gallery.room.schlafzimmer-3": "Bedroom 3",
      "gallery.room.badezimmer-1": "Bathroom 1",
      "gallery.room.badezimmer-2": "Bathroom 2",
      "gallery.room.badezimmer-3": "Bathroom 3",
      "gallery.emptyLead": "Gallery data could not be loaded.",
      "gallery.emptyFile":
        "When opening <code>index.html</code> directly, some browsers block local scripts. Please start a local server, e.g. <code>python3 -m http.server 8000</code>, and open <code>http://localhost:8000</code>.",
      "gallery.emptyGeneric":
        "Please check that <code>assets/airbnb/gallery-data.js</code> exists and reload the page.",

      "preise.eyebrow": "Prices & availability",
      "preise.title": "Your stay",
      "preise.intro":
        "Non-binding guide prices in euros (as of May 2026). Seasonal variations possible – exact amounts on request or in the Airbnb listing.",
      "preise.card1Title": "Low season",
      "preise.card1Price": "approx. €286 / night",
      "preise.card1Text": "For quieter travel periods and longer stays.",
      "preise.card2Title": "Northern lights & winter",
      "preise.card2Price": "approx. €2,000 / week",
      "preise.card2Note": "approx. €286 per night · 7 nights",
      "preise.card2Text": "A popular time to travel for snow, northern lights and winter experiences.",
      "preise.card3Title": "Summer",
      "preise.card3Price": "approx. €286 / night",
      "preise.card3Text": "Ideal for the midnight sun, excursions and nature.",
      "preise.policyTitle": "Booking information",
      "preise.policy1": "<strong>Minimum stay:</strong> 2 nights.",
      "preise.policy2": "<strong>Check-in:</strong> from 16:00.",
      "preise.policy3": "<strong>Check-out:</strong> 11:00.",
      "preise.policy4": "<strong>Cleaning fee:</strong> on request.",
      "preise.policy5": "<strong>Children:</strong> policy to be added by the host.",
      "preise.policy6": "<strong>Pets:</strong> on request.",

      "bewertungen.eyebrow": "Guest voices",
      "bewertungen.title": "Reviews",
      "bewertungen.intro":
        "Sample quotes – to be replaced later with approved reviews from Airbnb or direct bookings.",
      "bewertungen.q1": "“A peaceful place, perfect after a day full of excursions around Kirkenes.”",
      "bewertungen.q2": "“A great base for the northern lights, nature and relaxed evenings in the house.”",
      "bewertungen.q3": "“Easy communication and everything important within quick reach.”",
      "bewertungen.cite": "Sample review ·",

      "lage.eyebrow": "Directions & location",
      "lage.title": "Sør-Varanger near Kirkenes",
      "lage.body":
        "The house is located in Sør-Varanger at Vaggeveien 12, right by the water on the Pasvikelv. Kirkenes, with its airport and shopping, is easily reached by car.",
      "lage.address": "<strong>Address:</strong> Vaggeveien 12, Sør-Varanger, Norway",
      "lage.routeBtn": "Route on Google Maps",
      "lage.distAria": "Getting here and surroundings",
      "lage.dist1Aria": "Open Kirkenes on Google Maps (shopping)",
      "lage.dist1Label": "Kirkenes · shopping",
      "lage.dist2Aria": "Open Kirkenes Airport on Google Maps",
      "lage.dist2Label": "Kirkenes Airport",
      "lage.dist3Label": "Nature & excursions",
      "lage.dist4Label": "Border region",
      "lage.mapTitle": "Map: Vaggeveien 12, Sør-Varanger, Norway",

      "anreise.eyebrow": "Getting here",
      "anreise.title": "Freedom with a rental car",
      "anreise.intro":
        "From Kirkenes to Sør-Varanger – right next to the Finnish border and the perfect base for trips to Finland. Your own car makes your stay far more relaxed.",
      "anreise.recommendLabel": "Our recommendation",
      "anreise.recommend":
        "<strong>For this holiday home we strongly recommend renting a car</strong> – ideally picking it up directly at Kirkenes Airport (KKN / Høybuktmoen) on arrival and returning it on departure.",
      "anreise.intro1":
        "The lodge lies in Sør-Varanger on the Pasvikelv – about <strong>45–60 minutes by car</strong> south of Kirkenes. Public transport is sparse; with a rental car you are independent: chase the northern lights, explore fjords and tundra, shop in Kirkenes, enjoy day trips to neighbouring Finland and the border region towards the North Cape – in winter and summer, without waiting for bus timetables.",
      "anreise.intro2":
        "The flexibility especially pays off for <strong>families and groups of up to 10 people</strong>: travel together, carry your shopping, plan excursions spontaneously. At Kirkenes Airport several major chains and local partners are ready – pick up in the arrivals hall, return before departure, often done within minutes.",
      "anreise.providerAria": "Car rental providers at Kirkenes Airport",
      "anreise.providerTitle": "Bookable at KKN airport e.g. with",
      "anreise.carGridAria": "Sample vehicles and guide prices",
      "anreise.perDay": "approx. per day",
      "anreise.perWeek": "approx. per week",
      "anreise.car1Cat": "Compact class",
      "anreise.car1Title": "Small car · e.g. Toyota Yaris",
      "anreise.car1Text":
        "Economical for couples or small families – good for summer roads and the route Kirkenes ↔ Sør-Varanger.",
      "anreise.car1Alt": "MG4 Electric compact car in the snow, Norway",
      "anreise.car1Day": "from €65",
      "anreise.car1Week": "from €365",
      "anreise.car1Link": "Bookable at Kirkenes Airport · Budget",
      "anreise.car2Cat": "SUV / 4×4",
      "anreise.car2Title": "Off-road capable · e.g. Toyota RAV4",
      "anreise.car2Text":
        "Our top recommendation for winter, snow and longer tours in the Arctic – more comfort and a greater sense of safety on Norwegian roads.",
      "anreise.car2Alt": "SUV on a snowy road between snow-covered trees – winter drive in Norway",
      "anreise.car2Day": "from €95",
      "anreise.car2Week": "from €565",
      "anreise.car2Link": "Bookable at Kirkenes Airport · Hertz",
      "anreise.car3Cat": "Estate / mid-size",
      "anreise.car3Title": "Estate car · e.g. VW Passat Variant",
      "anreise.car3Text":
        "Plenty of boot space for supplies from Kirkenes, child seats and luggage – ideal for groups with more luggage, without a minibus.",
      "anreise.car3Alt": "VW Passat Variant estate on a snowy road, Norway",
      "anreise.car3Day": "from €83",
      "anreise.car3Week": "from €490",
      "anreise.car3Link": "Bookable at Kirkenes Airport · Europcar",
      "anreise.tipsTitle": "Practical tips",
      "anreise.tip1":
        "<strong>Airport:</strong> Kirkenes Airport Høybuktmoen (KKN) – car rental desks in the arrivals hall; comparison portals: DiscoverCars, autoprio.no, momondo.no.",
      "anreise.tip2":
        "<strong>Drive to the lodge:</strong> approx. 45–60 min. to Sør-Varanger (Vaggeveien 12) – route via E6/E105; in winter consider winter tyres / 4×4.",
      "anreise.tip3":
        "<strong>Book early:</strong> during the northern lights season (Oct–Mar) and in summer, vehicles sell out quickly – reserving a few weeks in advance is worthwhile.",
      "anreise.disclaimer":
        "All prices are <strong>non-binding guide values in euros</strong> (estimates, marked “approx.”) for 2025/2026 – converted from Norwegian offers at an exchange rate of approx. <strong>1 EUR ≈ 11.5 NOK</strong> (as of May 2026). Depending on season, insurance, mileage package and time of booking. Research includes DiscoverCars.no, autoprio.no, Budget.no, KAYAK; bookable at Kirkenes Airport. Please check current prices directly with the provider.",

      "buchung.eyebrow": "Booking",
      "buchung.title": "Check availability",
      "buchung.intro":
        "Non-binding enquiry – we will get back to you personally. You will receive a confirmation after sending.",
      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "buchung.arrival": "Arrival",
      "buchung.departure": "Departure",
      "buchung.guests": "Guests",
      "buchung.requestType": "Type of enquiry",
      "buchung.opt1": "Booking enquiry",
      "buchung.opt2": "Request a call back",
      "buchung.opt3": "General question",
      "buchung.messagePlaceholder": "Preferred dates, questions or special notes",
      "buchung.submit": "Send enquiry",

      "kontakt.eyebrow": "Contact",
      "kontakt.title": "Reach us personally",
      "kontakt.intro":
        "Phone, email or WhatsApp will follow shortly. For added trust we also refer to the existing Airbnb listing – or write to us directly via the form.",
      "kontakt.email": "<strong>Email:</strong> on request",
      "kontakt.phone": "<strong>Phone:</strong> on request",
      "kontakt.whatsapp": "<strong>WhatsApp:</strong> on request",
      "kontakt.airbnbBtn": "Open Airbnb listing",
      "kontakt.formTitle": "Send a message",
      "kontakt.subject": "Subject",
      "kontakt.subjectPlaceholder": "Question about the house or location",
      "kontakt.submit": "Send message",

      "footer.address": "Vaggeveien 12 · Sør-Varanger, Norway",
      "footer.checkinout": "Check-in from 16:00 · check-out at 11:00",
      "footer.navAria": "Footer",
      "footer.top": "Back to top",
      "footer.copy": "© 2026 Arctic Lodge · Prototype for a rental website",

      "form.sending": "Sending …",
      "form.success": "Thank you! Your enquiry has been sent. We will get back to you as soon as possible.",
      "form.error": "An error occurred while sending. Please try again later or write to us by email.",
      "form.mailtoHint":
        "Note: real sending still needs a Web3Forms key. We have opened your email app with a pre-filled message – please just send it.",
      "form.subjectBooking": "New booking enquiry – Arctic Lodge",
      "form.subjectContact": "Contact enquiry – Arctic Lodge",

      "autoreply.subject": "Thank you for your enquiry – Arctic Lodge",
      "autoreply.message":
        "Thank you for your enquiry to Arctic Lodge in Sør-Varanger! We have received your message and will get back to you personally as soon as possible. If you have any urgent questions, feel free to simply reply to this email.\n\nWarm regards,\nYour Arctic Lodge Team",

      "lightbox.aria": "Image preview",
      "lightbox.close": "Close",
      "lightbox.prev": "Previous image",
      "lightbox.next": "Next image",
    },

    no: {
      "title": "Arctic Lodge | Feriehus i Nord-Norge",
      "meta.description":
        "Feriehus i Sør-Varanger nær Kirkenes, Norge – rett ved vannet, med badstue og peis. Opptil 10 gjester, 3 soverom.",
      "brand": "Arctic Lodge",

      "nav.logoAria": "Til forsiden",
      "nav.toggle": "Meny",
      "nav.aria": "Hovednavigasjon",
      "nav.haus": "Huset",
      "nav.ausstattung": "Fasiliteter",
      "nav.grundriss": "Planløsning",
      "nav.galerie": "Galleri",
      "nav.preise": "Priser",
      "nav.lage": "Beliggenhet",
      "nav.anreise": "Reise hit",
      "nav.bewertungen": "Anmeldelser",
      "nav.kontakt": "Kontakt",
      "nav.cta": "Forespørsel",
      "lang.aria": "Velg språk",

      "hero.mediaAria": "Arctic Lodge under nordlyset – tømmerhytte i snøen i Sør-Varanger",
      "hero.expandAria": "Forstørr hovedbilde",
      "hero.lightboxCaption": "Arctic Lodge under nordlyset – tømmerhytte i snøen i Sør-Varanger",
      "hero.eyebrow": "Feriehus · Sør-Varanger nær Kirkenes, Norge",
      "hero.title": "Arctic Lodge",
      "hero.lead": "Rett ved vannet i Sør-Varanger",
      "hero.text":
        "Et romslig feriehus for opptil 10 gjester i Sør-Varanger – med badstue, peis, terrasse og balkong ved vannet. Et ideelt utgangspunkt for nordlys, grenseområdet og stillheten lengst nordøst.",
      "hero.cta1": "Sjekk tilgjengelighet",
      "hero.cta2": "Bilder",

      "haus.title": "Velkommen til Sør-Varanger",
      "haus.lead":
        "Huset ligger i Sør-Varanger – ved Pasvikelva, omtrent en times kjøretur sør for Kirkenes, lengst nordøst i Norge.",
      "haus.body":
        "Med 3 soverom, 7 senger, 3 bad og plass til opptil 10 gjester gir det et privat tilfluktssted rett ved vannet: badstue, peis, terrasse, balkong og rask Wi-Fi over fiber. Innsjekk fra 16:00, utsjekk 11:00; minimum opphold 2 netter.",
      "facts.quickAria": "Kort om huset",
      "facts.qmValue": "På forespørsel",
      "facts.qmLabel": "Kvadratmeter",
      "facts.guestsLabel": "Gjester maks.",
      "facts.bedroomsLabel": "Soverom",
      "facts.bathroomsLabel": "Bad",
      "facts.checkinValue": "fra 16:00",
      "facts.checkinLabel": "Innsjekk",
      "facts.checkoutValue": "11:00",
      "facts.checkoutLabel": "Utsjekk",

      "highlights.eyebrow": "Høydepunkter",
      "highlights.title": "Huset på et øyeblikk",
      "highlights.intro": "Utvalgte særpreg ved huset ved vannet i Sør-Varanger.",
      "highlights.card1Title": "Rett ved vannet",
      "highlights.card1Text": "Beliggenhet ved Pasvikelva i Sør-Varanger – vann, vid utsikt og ro rett utenfor døren.",
      "highlights.card2Title": "Badstue og peis",
      "highlights.card2Text": "Slapp av etter utflukter: egen badstue, peis inne og bålplass ute.",
      "highlights.card3Title": "Terrasse og balkong",
      "highlights.card3Text": "Uteområder å nyte – med utsikt mot vannet og nordisk natur.",
      "highlights.card4Title": "Wi-Fi / fiber",
      "highlights.card4Text": "Rask internett for hverdag, strømming og hjemmekontor på arbeidsplassen.",
      "highlights.card5Title": "Fullt utstyrt kjøkken",
      "highlights.card5Text": "Kjøkken med alt du trenger for lengre opphold og felles matlaging.",
      "highlights.card6Title": "Parkering og TV",
      "highlights.card6Text": "Parkering ved huset, TV, vaskemaskin og arbeidsplass i huset.",

      "ausstattung.eyebrow": "Fasiliteter",
      "ausstattung.title": "Komfort for oppholdet ditt",
      "ausstattung.intro": "Oversikt over bekreftede fasiliteter – åpne punkter er merket «på forespørsel».",
      "ausstattung.wohnTitle": "Stue",
      "ausstattung.wohn1": "Koselig sittekrok med peis inne",
      "ausstattung.wohn2": "Bålplass ute",
      "ausstattung.wohn3": "TV",
      "ausstattung.wohn4": "Badstue i huset",
      "ausstattung.kuecheTitle": "Kjøkken",
      "ausstattung.kueche1": "Fullt utstyrt kjøkken",
      "ausstattung.kueche2": "Servise og kjøkkenutstyr",
      "ausstattung.kueche3": "Kaffemaskin – på forespørsel",
      "ausstattung.schlafTitle": "Soverom",
      "ausstattung.schlaf1": "3 soverom · 7 senger · maks. 10 gjester",
      "ausstattung.schlaf2": "Sengetøy er inkludert",
      "ausstattung.badTitle": "Bad",
      "ausstattung.bad1": "3 bad",
      "ausstattung.bad2": "Håndklær finnes",
      "ausstattung.bad3": "Hårføner tilgjengelig",
      "ausstattung.aussenTitle": "Ute og beliggenhet",
      "ausstattung.aussen1": "Terrasse og balkong",
      "ausstattung.aussen2": "Parkering ved huset",
      "ausstattung.aussen3": "Rett ved vannet · Vaggeveien 12, Sør-Varanger",
      "ausstattung.allgTitle": "Generelt",
      "ausstattung.allg1": "Wi-Fi / fiber",
      "ausstattung.allg2": "Vaskemaskin",
      "ausstattung.allg3": "Arbeidsplass",
      "ausstattung.allg4": "Innsjekk fra 16:00 · utsjekk 11:00",
      "ausstattung.allg5": "Kjæledyr – på forespørsel",

      "grundriss.eyebrow": "Planløsning",
      "grundriss.title": "Romfordeling i hytta",
      "grundriss.intro":
        "Første etasje og loftetasje på et øyeblikk – stort og oversiktlig, som på en detaljside for en hytte. Klikk for å forstørre.",
      "grundriss.plansAria": "Planløsninger for hytta",
      "grundriss.egAria": "Forstørr planløsning første etasje",
      "grundriss.egCaption": "Planløsning første etasje",
      "grundriss.egFig": "Første etasje",
      "grundriss.dgAria": "Forstørr planløsning loftetasje",
      "grundriss.dgCaption": "Planløsning loftetasje",
      "grundriss.dgFig": "Loftetasje",
      "grundriss.sketchView": "Se planskisse",
      "grundriss.sketchCaption": "Planskisse – Savio Lodge",
      "grundriss.pdf": "Last ned PDF",
      "grundriss.archiveNote":
        "· Flere dokumenter i arkivet under <code>assets/haus-fotos/Unterlagen_zum_Haus/</code>.",

      "galerie.eyebrow": "Galleri",
      "galerie.title": "Inntrykk",
      "galerie.filtersAria": "Filtrer galleri etter område",
      "galerie.uploadLabel": "Test egne bilder eller videoer",
      "galerie.uploadHint":
        "Prototype: forhåndsvisning kun i nettleseren. For den publiserte siden, legg bilder i <code>assets/</code> og lenk dem i galleriet.",

      "gallery.all": "Alle",
      "gallery.enlarge": "Forstørr {title}",
      "gallery.cat.aussen": "Ute og terrasse",
      "gallery.cat.wohnen": "Stue",
      "gallery.cat.schlafzimmer": "Soverom",
      "gallery.cat.bad": "Bad",
      "gallery.cat.sauna": "Badstue og velvære",
      "gallery.cat.aktivitaeten": "Aktiviteter og omgivelser",
      "gallery.room.schlafzimmer-1": "Soverom 1",
      "gallery.room.schlafzimmer-2": "Soverom 2",
      "gallery.room.schlafzimmer-3": "Soverom 3",
      "gallery.room.badezimmer-1": "Bad 1",
      "gallery.room.badezimmer-2": "Bad 2",
      "gallery.room.badezimmer-3": "Bad 3",
      "gallery.emptyLead": "Galleridata kunne ikke lastes.",
      "gallery.emptyFile":
        "Når <code>index.html</code> åpnes direkte, blokkerer noen nettlesere lokale skript. Start en lokal server, f.eks. <code>python3 -m http.server 8000</code>, og åpne <code>http://localhost:8000</code>.",
      "gallery.emptyGeneric":
        "Sjekk at <code>assets/airbnb/gallery-data.js</code> finnes og last inn siden på nytt.",

      "preise.eyebrow": "Priser og tilgjengelighet",
      "preise.title": "Ditt opphold",
      "preise.intro":
        "Uforpliktende veiledende priser i euro (per mai 2026). Sesongvariasjoner mulig – nøyaktige beløp på forespørsel eller i Airbnb-annonsen.",
      "preise.card1Title": "Lavsesong",
      "preise.card1Price": "ca. 286 € / natt",
      "preise.card1Text": "For roligere reiseperioder og lengre opphold.",
      "preise.card2Title": "Nordlys og vinter",
      "preise.card2Price": "ca. 2 000 € / uke",
      "preise.card2Note": "ca. 286 € per natt · 7 netter",
      "preise.card2Text": "En populær reisetid for snø, nordlys og vinteropplevelser.",
      "preise.card3Title": "Sommer",
      "preise.card3Price": "ca. 286 € / natt",
      "preise.card3Text": "Ideelt for midnattssol, utflukter og natur.",
      "preise.policyTitle": "Informasjon om booking",
      "preise.policy1": "<strong>Minimum opphold:</strong> 2 netter.",
      "preise.policy2": "<strong>Innsjekk:</strong> fra 16:00.",
      "preise.policy3": "<strong>Utsjekk:</strong> 11:00.",
      "preise.policy4": "<strong>Rengjøringsgebyr:</strong> på forespørsel.",
      "preise.policy5": "<strong>Barn:</strong> regler oppgis av verten.",
      "preise.policy6": "<strong>Kjæledyr:</strong> på forespørsel.",

      "bewertungen.eyebrow": "Gjesteuttalelser",
      "bewertungen.title": "Anmeldelser",
      "bewertungen.intro":
        "Eksempelsitater – erstattes senere med godkjente anmeldelser fra Airbnb eller direktebookinger.",
      "bewertungen.q1": "«Et rolig sted, perfekt etter en dag full av utflukter rundt Kirkenes.»",
      "bewertungen.q2": "«Et flott utgangspunkt for nordlys, natur og avslappede kvelder i huset.»",
      "bewertungen.q3": "«Enkel kommunikasjon og alt det viktige raskt tilgjengelig.»",
      "bewertungen.cite": "Eksempelanmeldelse ·",

      "lage.eyebrow": "Adkomst og beliggenhet",
      "lage.title": "Sør-Varanger nær Kirkenes",
      "lage.body":
        "Huset ligger i Sør-Varanger i Vaggeveien 12, rett ved vannet ved Pasvikelva. Kirkenes med flyplass og handlemuligheter er lett tilgjengelig med bil.",
      "lage.address": "<strong>Adresse:</strong> Vaggeveien 12, Sør-Varanger, Norge",
      "lage.routeBtn": "Rute på Google Maps",
      "lage.distAria": "Adkomst og omgivelser",
      "lage.dist1Aria": "Åpne Kirkenes i Google Maps (handel)",
      "lage.dist1Label": "Kirkenes · handel",
      "lage.dist2Aria": "Åpne Kirkenes lufthavn i Google Maps",
      "lage.dist2Label": "Kirkenes lufthavn",
      "lage.dist3Label": "Natur og utflukter",
      "lage.dist4Label": "Grenseområdet",
      "lage.mapTitle": "Kart: Vaggeveien 12, Sør-Varanger, Norge",

      "anreise.eyebrow": "Reise hit",
      "anreise.title": "Fri med leiebil",
      "anreise.intro":
        "Fra Kirkenes til Sør-Varanger – helt inntil den finske grensen og perfekt som utgangspunkt for turer til Finland. En egen bil gjør oppholdet langt mer avslappet.",
      "anreise.recommendLabel": "Vår anbefaling",
      "anreise.recommend":
        "<strong>For dette feriehuset anbefaler vi sterkt å leie bil</strong> – aller helst hente den rett på Kirkenes lufthavn (KKN / Høybuktmoen) ved ankomst og levere den ved avreise.",
      "anreise.intro1":
        "Hytta ligger i Sør-Varanger ved Pasvikelva – omtrent <strong>45–60 minutter med bil</strong> sør for Kirkenes. Kollektivtilbudet er begrenset; med leiebil er du uavhengig: jakte nordlys, utforske fjorder og tundra, handle i Kirkenes, nyte dagsturer til nabolandet Finland og grenseområdet mot Nordkapp – vinter som sommer, uten å vente på bussruter.",
      "anreise.intro2":
        "Fleksibiliteten lønner seg særlig for <strong>familier og grupper på opptil 10 personer</strong>: reis sammen, frakt innkjøp, planlegg utflukter spontant. På Kirkenes lufthavn står flere store kjeder og lokale partnere klare – henting i ankomsthallen, levering før avgang, ofte gjort på få minutter.",
      "anreise.providerAria": "Leiebilleverandører på Kirkenes lufthavn",
      "anreise.providerTitle": "Kan bookes på KKN-flyplassen bl.a. hos",
      "anreise.carGridAria": "Eksempelbiler og veiledende priser",
      "anreise.perDay": "ca. per dag",
      "anreise.perWeek": "ca. per uke",
      "anreise.car1Cat": "Kompaktklasse",
      "anreise.car1Title": "Småbil · f.eks. Toyota Yaris",
      "anreise.car1Text":
        "Økonomisk for par eller små familier – fin for sommerveier og strekningen Kirkenes ↔ Sør-Varanger.",
      "anreise.car1Alt": "MG4 Electric kompaktbil i snøen, Norge",
      "anreise.car1Day": "fra 65 €",
      "anreise.car1Week": "fra 365 €",
      "anreise.car1Link": "Kan bookes på Kirkenes lufthavn · Budget",
      "anreise.car2Cat": "SUV / 4×4",
      "anreise.car2Title": "Terrengvennlig · f.eks. Toyota RAV4",
      "anreise.car2Text":
        "Vår toppanbefaling for vinter, snø og lengre turer i Arktis – mer komfort og trygghetsfølelse på norske veier.",
      "anreise.car2Alt": "SUV på snødekt vei mellom snødekte trær – vinterkjøring i Norge",
      "anreise.car2Day": "fra 95 €",
      "anreise.car2Week": "fra 565 €",
      "anreise.car2Link": "Kan bookes på Kirkenes lufthavn · Hertz",
      "anreise.car3Cat": "Stasjonsvogn / mellomklasse",
      "anreise.car3Title": "Stasjonsvogn · f.eks. VW Passat Variant",
      "anreise.car3Text":
        "Mye bagasjeplass for forsyninger fra Kirkenes, barneseter og bagasje – ideelt for grupper med mer bagasje, uten minibuss.",
      "anreise.car3Alt": "VW Passat Variant stasjonsvogn på snødekt vei, Norge",
      "anreise.car3Day": "fra 83 €",
      "anreise.car3Week": "fra 490 €",
      "anreise.car3Link": "Kan bookes på Kirkenes lufthavn · Europcar",
      "anreise.tipsTitle": "Praktiske tips",
      "anreise.tip1":
        "<strong>Flyplass:</strong> Kirkenes lufthavn Høybuktmoen (KKN) – leiebilskranker i ankomsthallen; sammenligningsportaler: DiscoverCars, autoprio.no, momondo.no.",
      "anreise.tip2":
        "<strong>Kjøretur til hytta:</strong> ca. 45–60 min. til Sør-Varanger (Vaggeveien 12) – rute via E6/E105; vurder vinterdekk/4×4 om vinteren.",
      "anreise.tip3":
        "<strong>Book tidlig:</strong> i nordlyssesongen (okt.–mars) og om sommeren blir biler raskt utsolgt – reservasjon noen uker i forveien lønner seg.",
      "anreise.disclaimer":
        "Alle priser er <strong>uforpliktende veiledende verdier i euro</strong> (estimater, merket «ca.») for 2025/2026 – omregnet fra norske tilbud med en vekslingskurs på ca. <strong>1 EUR ≈ 11,5 NOK</strong> (per mai 2026). Avhengig av sesong, forsikring, kilometerpakke og bookingtidspunkt. Research bl.a. DiscoverCars.no, autoprio.no, Budget.no, KAYAK; kan bookes på Kirkenes lufthavn. Sjekk gjeldende priser direkte hos leverandøren.",

      "buchung.eyebrow": "Booking",
      "buchung.title": "Sjekk tilgjengelighet",
      "buchung.intro":
        "Uforpliktende forespørsel – vi tar personlig kontakt med deg. Du får en bekreftelse etter sending.",
      "form.name": "Navn",
      "form.email": "E-post",
      "form.message": "Melding",
      "buchung.arrival": "Ankomst",
      "buchung.departure": "Avreise",
      "buchung.guests": "Gjester",
      "buchung.requestType": "Type forespørsel",
      "buchung.opt1": "Bookingforespørsel",
      "buchung.opt2": "Be om tilbakeringing",
      "buchung.opt3": "Generelt spørsmål",
      "buchung.messagePlaceholder": "Ønsket periode, spørsmål eller spesielle merknader",
      "buchung.submit": "Send forespørsel",

      "kontakt.eyebrow": "Kontakt",
      "kontakt.title": "Kontakt oss direkte",
      "kontakt.intro":
        "Telefon, e-post eller WhatsApp kommer snart. For ekstra trygghet viser vi også til den eksisterende Airbnb-annonsen – eller skriv til oss direkte via skjemaet.",
      "kontakt.email": "<strong>E-post:</strong> på forespørsel",
      "kontakt.phone": "<strong>Telefon:</strong> på forespørsel",
      "kontakt.whatsapp": "<strong>WhatsApp:</strong> på forespørsel",
      "kontakt.airbnbBtn": "Åpne Airbnb-annonse",
      "kontakt.formTitle": "Send melding",
      "kontakt.subject": "Emne",
      "kontakt.subjectPlaceholder": "Spørsmål om huset eller beliggenheten",
      "kontakt.submit": "Send melding",

      "footer.address": "Vaggeveien 12 · Sør-Varanger, Norge",
      "footer.checkinout": "Innsjekk fra 16:00 · utsjekk 11:00",
      "footer.navAria": "Bunntekst",
      "footer.top": "Til toppen",
      "footer.copy": "© 2026 Arctic Lodge · Prototype for en utleienettside",

      "form.sending": "Sender …",
      "form.success": "Takk! Forespørselen din er sendt. Vi tar kontakt så snart som mulig.",
      "form.error": "Det oppstod en feil under sending. Prøv igjen senere eller skriv til oss på e-post.",
      "form.mailtoHint":
        "Merk: ekte sending krever fortsatt en Web3Forms-nøkkel. Vi har åpnet e-postappen din med en ferdig utfylt melding – bare send den.",
      "form.subjectBooking": "Ny bookingforespørsel – Arctic Lodge",
      "form.subjectContact": "Kontaktforespørsel – Arctic Lodge",

      "autoreply.subject": "Takk for henvendelsen din – Arctic Lodge",
      "autoreply.message":
        "Tusen takk for henvendelsen din til Arctic Lodge i Sør-Varanger! Vi har mottatt meldingen din og tar personlig kontakt med deg så snart som mulig. Har du noe som haster, er det bare å svare direkte på denne e-posten.\n\nVennlig hilsen\nDitt Arctic Lodge Team",

      "lightbox.aria": "Bildeforhåndsvisning",
      "lightbox.close": "Lukk",
      "lightbox.prev": "Forrige bilde",
      "lightbox.next": "Neste bilde",
    },
  };

  const state = { current: DEFAULT_LANG };
  const listeners = [];

  const ATTR_BINDINGS = [
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-aria-label", "aria-label"],
    ["data-i18n-title", "title"],
    ["data-i18n-alt", "alt"],
    ["data-i18n-content", "content"],
    ["data-i18n-caption", "data-lightbox-caption"],
  ];

  function normalize(lang) {
    return LANGS.includes(lang) ? lang : null;
  }

  function t(key, params) {
    const dict = translations[state.current] || translations[DEFAULT_LANG];
    let str = dict[key];
    if (str == null) {
      str = translations[DEFAULT_LANG][key];
    }
    if (str == null) {
      return key;
    }
    if (params) {
      Object.keys(params).forEach((p) => {
        str = str.replace(new RegExp("\\{" + p + "\\}", "g"), params[p]);
      });
    }
    return str;
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations[DEFAULT_LANG];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key] != null ? dict[key] : translations[DEFAULT_LANG][key];
      if (value != null) {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = dict[key] != null ? dict[key] : translations[DEFAULT_LANG][key];
      if (value != null) {
        el.innerHTML = value;
      }
    });

    ATTR_BINDINGS.forEach(([dataAttr, targetAttr]) => {
      document.querySelectorAll("[" + dataAttr + "]").forEach((el) => {
        const key = el.getAttribute(dataAttr);
        const value = dict[key] != null ? dict[key] : translations[DEFAULT_LANG][key];
        if (value != null) {
          el.setAttribute(targetAttr, value);
        }
      });
    });
  }

  function updateSwitcher(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function applyLanguage(lang, opts) {
    const options = opts || {};
    const next = normalize(lang) || DEFAULT_LANG;
    state.current = next;
    document.documentElement.lang = next;
    applyTranslations(next);
    updateSwitcher(next);
    if (options.persist) {
      try {
        localStorage.setItem(STORAGE_LANG, next);
      } catch (err) {
        /* localStorage nicht verfügbar – ignorieren */
      }
    }
    listeners.forEach((fn) => {
      try {
        fn(next);
      } catch (err) {
        /* einzelne Listener-Fehler nicht weiterreichen */
      }
    });
  }

  function fromNavigator() {
    const n = (navigator.language || "").toLowerCase();
    if (n.startsWith("nb") || n.startsWith("nn") || n.startsWith("no")) return "no";
    if (n.startsWith("de")) return "de";
    if (n.startsWith("en")) return "en";
    return null;
  }

  function mapCountryToLang(code) {
    const cc = (code || "").toUpperCase();
    if (cc === "NO") return "no";
    if (["DE", "AT", "CH", "LI"].includes(cc)) return "de";
    return "en";
  }

  function detectByIp() {
    const endpoints = ["https://ipwho.is/", "https://ipapi.co/json/"];

    const tryEndpoint = (url) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), IP_TIMEOUT_MS);
      return fetch(url, { signal: controller.signal })
        .then((res) => {
          clearTimeout(timer);
          if (!res.ok) return null;
          return res.json();
        })
        .then((data) => {
          if (!data) return null;
          const code = data.country_code || data.countryCode || data.country;
          return code ? mapCountryToLang(code) : null;
        })
        .catch(() => {
          clearTimeout(timer);
          return null;
        });
    };

    return endpoints.reduce(
      (chain, url) => chain.then((result) => (result ? result : tryEndpoint(url))),
      Promise.resolve(null)
    );
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function initSwitcher() {
    const switcher = document.querySelector("#langSwitcher");
    if (!switcher) return;
    switcher.addEventListener("click", (event) => {
      const btn = event.target instanceof Element ? event.target.closest(".lang-btn") : null;
      if (!btn) return;
      const lang = btn.getAttribute("data-lang");
      if (lang) {
        applyLanguage(lang, { persist: true });
      }
    });
  }

  function init() {
    initSwitcher();

    const savedChoice = normalize(readStorage(STORAGE_LANG));
    const cachedGeo = normalize(readStorage(STORAGE_GEO));
    const initial = savedChoice || cachedGeo || fromNavigator() || DEFAULT_LANG;
    applyLanguage(initial, { persist: false });

    // Nur beim ersten Besuch (keine gespeicherte Wahl, kein Cache) IP-Erkennung.
    if (!savedChoice && !cachedGeo) {
      detectByIp().then((lang) => {
        const next = normalize(lang);
        if (!next) return;
        try {
          localStorage.setItem(STORAGE_GEO, next);
        } catch (err) {
          /* ignorieren */
        }
        // Nicht überschreiben, falls der Nutzer inzwischen manuell gewählt hat.
        if (!normalize(readStorage(STORAGE_LANG))) {
          applyLanguage(next, { persist: false });
        }
      });
    }
  }

  window.I18N = {
    t: t,
    getLanguage: function () {
      return state.current;
    },
    setLanguage: function (lang) {
      applyLanguage(lang, { persist: true });
    },
    onChange: function (fn) {
      if (typeof fn === "function") {
        listeners.push(fn);
      }
    },
    LANGS: LANGS,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
