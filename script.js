const siteHeader = document.querySelector("#siteHeader");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const uploadInput = document.querySelector("#mediaUpload");
const galleryShell = document.querySelector("#galleryShell");
const galleryFilters = document.querySelector("#galleryFilters");
const bookingForm = document.querySelector("#bookingForm");
const bookingStatus = document.querySelector("#bookingStatus");
const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#contactStatus");

/* ===========================================================================
 * Formular-Versand (Web3Forms) – Konfiguration
 * ---------------------------------------------------------------------------
 * TODO (Nutzer): Hier den echten, kostenlosen Web3Forms-Access-Key eintragen
 * (https://web3forms.com). Solange der Platzhalter steht, öffnet das Formular
 * stattdessen eine vorausgefüllte E-Mail (mailto-Fallback) an CONTACT_EMAIL.
 * =========================================================================== */
const WEB3FORMS_ACCESS_KEY = "36f5afd4-55e9-40d1-8f22-c97fe7e751b4"; // Web3Forms-Key (an Empfänger-E-Mail gebunden)
const CONTACT_EMAIL = "DEINE-EMAIL@example.com"; // TODO: echte Empfänger-E-Mail für den mailto-Fallback eintragen
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/* ===========================================================================
 * Automatische Bestätigungs-E-Mail an Anfragende (EmailJS) – Konfiguration
 * ---------------------------------------------------------------------------
 * ZUSÄTZLICH zu Web3Forms (Owner-Benachrichtigung, bleibt unverändert): EmailJS
 * sendet der/dem Anfragenden eine automatische Bestätigung in der aktuell aktiven
 * Sprache (DE/EN/NO). Web3Forms ist davon völlig unabhängig.
 *
 * TODO (Nutzer): Die folgenden drei Platzhalter mit den echten EmailJS-Werten
 * füllen (kostenloses Konto: https://www.emailjs.com). Solange ein Platzhalter
 * steht, wird der Auto-Reply sicher übersprungen (Web3Forms läuft normal weiter).
 *
 * Das EmailJS-Template muss die Variablen {{to_email}}, {{subject}}, {{message}}
 * (optional {{from_name}}, reply_to) nutzen; das „To"-Feld auf {{to_email}} setzen.
 * =========================================================================== */
const EMAILJS_PUBLIC_KEY = "Vtmt7cpivLBxCMd53"; // EmailJS Public Key
const EMAILJS_SERVICE_ID = "service_8n48mab"; // EmailJS Service-ID
const EMAILJS_TEMPLATE_ID = "template_5gs51l8"; // EmailJS Template-ID

/** True, sobald alle drei EmailJS-Werte echt sind (kein Platzhalter mehr). */
function isEmailJsConfigured() {
  return (
    Boolean(EMAILJS_PUBLIC_KEY) &&
    Boolean(EMAILJS_SERVICE_ID) &&
    Boolean(EMAILJS_TEMPLATE_ID) &&
    EMAILJS_PUBLIC_KEY !== "DEIN-EMAILJS-PUBLIC-KEY" &&
    EMAILJS_SERVICE_ID !== "DEINE-EMAILJS-SERVICE-ID" &&
    EMAILJS_TEMPLATE_ID !== "DEINE-EMAILJS-TEMPLATE-ID"
  );
}

/** EmailJS nur initialisieren, wenn konfiguriert UND das SDK geladen wurde. */
function initEmailJs() {
  if (isEmailJsConfigured() && typeof window.emailjs !== "undefined") {
    try {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (error) {
      console.warn("EmailJS-Initialisierung fehlgeschlagen:", error);
    }
  }
}

initEmailJs();

/**
 * Sendet der/dem Anfragenden eine automatische Bestätigung in der aktiven Sprache.
 * Nicht-blockierend: wird erst NACH erfolgreichem Web3Forms-Versand aufgerufen,
 * ändert die On-Page-Erfolgsmeldung nicht und schluckt Fehler (nur console.warn).
 */
function sendAutoReply(form) {
  if (!isEmailJsConfigured() || typeof window.emailjs === "undefined") {
    return;
  }

  const data = new FormData(form);
  // Beide Formulare abdecken: Buchung nutzt name/email, Kontakt contactName/contactEmail.
  const toEmail = String(data.get("email") || data.get("contactEmail") || "").trim();
  const toName = String(data.get("name") || data.get("contactName") || "").trim();
  if (!toEmail) {
    return;
  }

  const templateParams = {
    to_email: toEmail,
    to_name: toName,
    subject: tr("autoreply.subject"),
    message: tr("autoreply.message"),
    from_name: "Arctic Lodge",
  };
  // reply_to nur setzen, wenn eine echte Kontaktadresse hinterlegt ist.
  if (CONTACT_EMAIL && CONTACT_EMAIL !== "DEINE-EMAIL@example.com") {
    templateParams.reply_to = CONTACT_EMAIL;
  }

  try {
    const sending = window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    if (sending && typeof sending.catch === "function") {
      sending.catch((error) => {
        console.warn("EmailJS-Autobestätigung konnte nicht gesendet werden:", error);
      });
    }
  } catch (error) {
    console.warn("EmailJS-Autobestätigung konnte nicht gesendet werden:", error);
  }
}

/** Übersetzungs-Helfer: nutzt i18n.js, fällt sonst auf den Schlüssel zurück. */
function tr(key, params) {
  if (window.I18N && typeof window.I18N.t === "function") {
    return window.I18N.t(key, params);
  }
  return key;
}

const lightboxState = {
  items: [],
  index: 0,
  lastFocus: null,
  root: null,
  image: null,
  caption: null,
  counter: null,
};

function getLightboxSrc(trigger) {
  return trigger.getAttribute("data-lightbox-src") || trigger.querySelector("img")?.getAttribute("src") || "";
}

function getLightboxCaption(trigger) {
  return (
    trigger.getAttribute("data-lightbox-caption") ||
    trigger.querySelector("img")?.getAttribute("alt") ||
    ""
  );
}

function getLightboxGroup(trigger) {
  return trigger.getAttribute("data-lightbox-group") || "default";
}

function collectLightboxItems(group) {
  const triggers = document.querySelectorAll(".lightbox-trigger");
  const seen = new Set();

  lightboxState.items = Array.from(triggers)
    .map((trigger) => ({
      trigger,
      src: getLightboxSrc(trigger),
      caption: getLightboxCaption(trigger),
      group: getLightboxGroup(trigger),
    }))
    .filter((item) => {
      if (!item.src || item.group !== group || seen.has(item.src)) {
        return false;
      }
      if (item.trigger.closest("[hidden]")) {
        return false;
      }
      seen.add(item.src);
      return true;
    });
}

function ensureLightboxRoot() {
  if (lightboxState.root) {
    return lightboxState.root;
  }

  const root = document.createElement("div");
  root.className = "lightbox";
  root.id = "lightbox";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", tr("lightbox.aria"));
  root.innerHTML = `
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-panel">
      <button type="button" class="lightbox-close" data-lightbox-close aria-label="${tr("lightbox.close")}">
        <span aria-hidden="true">×</span>
      </button>
      <button type="button" class="lightbox-nav lightbox-prev" aria-label="${tr("lightbox.prev")}">
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" class="lightbox-nav lightbox-next" aria-label="${tr("lightbox.next")}">
        <span aria-hidden="true">›</span>
      </button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" src="" alt="">
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <p class="lightbox-counter" aria-live="polite"></p>
    </div>
  `;

  document.body.append(root);

  lightboxState.root = root;
  lightboxState.image = root.querySelector(".lightbox-image");
  lightboxState.caption = root.querySelector(".lightbox-caption");
  lightboxState.counter = root.querySelector(".lightbox-counter");

  root.querySelector(".lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  root.querySelector(".lightbox-next")?.addEventListener("click", () => stepLightbox(1));
  root.querySelectorAll("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", closeLightbox);
  });

  return root;
}

function renderLightbox() {
  const item = lightboxState.items[lightboxState.index];
  if (!item || !lightboxState.image) {
    return;
  }

  lightboxState.image.src = item.src;
  lightboxState.image.alt = item.caption;

  if (lightboxState.caption) {
    lightboxState.caption.textContent = item.caption;
    lightboxState.caption.hidden = !item.caption;
  }

  if (lightboxState.counter) {
    lightboxState.counter.textContent = `${lightboxState.index + 1} / ${lightboxState.items.length}`;
    lightboxState.counter.hidden = lightboxState.items.length <= 1;
  }

  const showNav = lightboxState.items.length > 1;
  lightboxState.root?.querySelector(".lightbox-prev")?.toggleAttribute("hidden", !showNav);
  lightboxState.root?.querySelector(".lightbox-next")?.toggleAttribute("hidden", !showNav);
}

function openLightbox(index, group) {
  const activeGroup = group || "default";
  collectLightboxItems(activeGroup);
  if (!lightboxState.items.length) {
    return;
  }

  const root = ensureLightboxRoot();
  lightboxState.index = Math.max(0, Math.min(index, lightboxState.items.length - 1));
  lightboxState.lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  renderLightbox();
  root.hidden = false;
  document.body.classList.add("lightbox-open");
  root.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  if (!lightboxState.root || lightboxState.root.hidden) {
    return;
  }

  lightboxState.root.hidden = true;
  document.body.classList.remove("lightbox-open");

  if (lightboxState.image) {
    lightboxState.image.removeAttribute("src");
  }

  lightboxState.lastFocus?.focus();
}

function stepLightbox(direction) {
  if (!lightboxState.items.length) {
    return;
  }

  lightboxState.index =
    (lightboxState.index + direction + lightboxState.items.length) % lightboxState.items.length;
  renderLightbox();
}

function localizeLightbox() {
  const root = lightboxState.root;
  if (!root) {
    return;
  }
  root.setAttribute("aria-label", tr("lightbox.aria"));
  root.querySelector(".lightbox-close")?.setAttribute("aria-label", tr("lightbox.close"));
  root.querySelector(".lightbox-prev")?.setAttribute("aria-label", tr("lightbox.prev"));
  root.querySelector(".lightbox-next")?.setAttribute("aria-label", tr("lightbox.next"));
}

function initLightbox() {
  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest(".lightbox-trigger") : null;
    if (!trigger) {
      return;
    }

    event.preventDefault();
    const group = getLightboxGroup(trigger);
    collectLightboxItems(group);
    const index = lightboxState.items.findIndex((item) => item.trigger === trigger);
    openLightbox(index >= 0 ? index : 0, group);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightboxState.root || lightboxState.root.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    }
  });
}

function initSectionBackgrounds() {
  const sections = document.querySelectorAll(".section-has-bg[data-bg]");
  if (!sections.length) {
    return;
  }

  const loadBackground = (section) => {
    const imagePath = section.getAttribute("data-bg");
    if (!imagePath || section.classList.contains("is-bg-loaded")) {
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.src = imagePath;
    image.onload = () => {
      section.style.setProperty("--section-bg", `url("${imagePath}")`);
      section.classList.add("is-bg-loaded");
    };
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            loadBackground(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "120px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach(loadBackground);
  }
}

const GALLERY_CATEGORY_LABELS = {
  aussen: "Außen & Terrasse",
  wohnen: "Wohnbereich",
  schlafzimmer: "Schlafzimmer",
  bad: "Badezimmer",
  sauna: "Sauna & Wellness",
  aktivitaeten: "Aktivitäten & Umgebung",
};

const GALLERY_CATEGORY_ORDER = ["aussen", "wohnen", "schlafzimmer", "bad", "sauna", "aktivitaeten"];

/** Raum-Unterteilung innerhalb von Schlafzimmer / Badezimmer (Reihenfolge = Airbnb-Tour) */
const GALLERY_SUBSECTIONS = {
  schlafzimmer: ["schlafzimmer-1", "schlafzimmer-2", "schlafzimmer-3"],
  bad: ["badezimmer-1", "badezimmer-2", "badezimmer-3"],
};

const GALLERY_ROOM_LABELS = {
  "schlafzimmer-1": "Schlafzimmer 1",
  "schlafzimmer-2": "Schlafzimmer 2",
  "schlafzimmer-3": "Schlafzimmer 3",
  "badezimmer-1": "Badezimmer 1",
  "badezimmer-2": "Badezimmer 2",
  "badezimmer-3": "Badezimmer 3",
};

const galleryState = {
  activeFilter: "all",
  categories: [],
  sections: new Map(),
};

/** Lokalisierter Kategorie-Titel (Fallback: Datenlabel bzw. deutsche Konstante). */
function galleryCategoryLabel(id, fallback) {
  const key = "gallery.cat." + id;
  const value = tr(key);
  if (value !== key) {
    return value;
  }
  return fallback || GALLERY_CATEGORY_LABELS[id] || id;
}

/** Lokalisierter Raum-Titel (Schlafzimmer/Badezimmer 1–3). */
function galleryRoomLabel(roomId) {
  const key = "gallery.room." + roomId;
  const value = tr(key);
  if (value !== key) {
    return value;
  }
  return GALLERY_ROOM_LABELS[roomId] || roomId;
}

function createGalleryTile(item, index) {
  const tile = document.createElement("article");
  const layoutClass =
    item.layout === "wide"
      ? "gallery-tile--wide"
      : item.layout === "tall"
        ? "gallery-tile--tall"
        : "";
  tile.className = ["gallery-tile", layoutClass].filter(Boolean).join(" ");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "gallery-tile-trigger lightbox-trigger";
  trigger.setAttribute("data-lightbox-group", "galerie");
  trigger.setAttribute("data-lightbox-src", item.file);
  trigger.setAttribute("data-lightbox-caption", item.title);
  trigger.dataset.titleText = item.title;
  trigger.setAttribute("aria-label", tr("gallery.enlarge", { title: item.title }));

  const image = document.createElement("img");
  image.src = item.file;
  image.alt = item.alt;
  if (item.width) {
    image.width = item.width;
  }
  if (item.height) {
    image.height = item.height;
  }
  image.loading = index < 6 ? "eager" : "lazy";
  image.decoding = "async";

  trigger.append(image);
  tile.append(trigger);
  return tile;
}

function renderGalleryEmptyMessage() {
  if (!galleryShell) {
    return;
  }

  const isFileProtocol = window.location.protocol === "file:";
  galleryShell.innerHTML = `
    <p class="gallery-empty">
      ${tr("gallery.emptyLead")}
      ${isFileProtocol ? tr("gallery.emptyFile") : tr("gallery.emptyGeneric")}
    </p>
  `;
}

function groupGalleryItems(items) {
  const grouped = new Map();
  GALLERY_CATEGORY_ORDER.forEach((categoryId) => grouped.set(categoryId, []));

  items.forEach((item) => {
    const categoryId = item.category || item.room || "aussen";
    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, []);
    }
    grouped.get(categoryId).push(item);
  });

  return grouped;
}

function groupGalleryItemsByRoom(items, roomOrder) {
  const grouped = new Map();
  roomOrder.forEach((roomId) => grouped.set(roomId, []));

  items.forEach((item) => {
    const roomId = item.room;
    if (!roomId) {
      return;
    }
    if (!grouped.has(roomId)) {
      grouped.set(roomId, []);
    }
    grouped.get(roomId).push(item);
  });

  return grouped;
}

function appendGalleryMosaic(parent, items, categoryId, startIndex) {
  const mosaic = document.createElement("div");
  mosaic.className = "gallery-mosaic";
  mosaic.dataset.categoryGrid = categoryId;

  const fragment = document.createDocumentFragment();
  let index = startIndex;
  items.forEach((item) => {
    fragment.append(createGalleryTile(item, index));
    index += 1;
  });
  mosaic.append(fragment);
  parent.append(mosaic);
  return index;
}

function setGalleryFilter(filterId) {
  galleryState.activeFilter = filterId;

  galleryFilters?.querySelectorAll(".gallery-filter").forEach((button) => {
    const isActive = button.getAttribute("data-filter") === filterId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  galleryState.sections.forEach((section, categoryId) => {
    const show = filterId === "all" || filterId === categoryId;
    section.hidden = !show;
  });
}

function initGalleryFilters(categories, counts) {
  if (!galleryFilters) {
    return;
  }

  galleryFilters.replaceChildren();

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "gallery-filter is-active";
  allButton.setAttribute("role", "tab");
  allButton.setAttribute("data-filter", "all");
  allButton.setAttribute("aria-selected", "true");
  allButton.innerHTML = `${tr("gallery.all")} <span class="gallery-filter-count">(${counts.all})</span>`;
  galleryFilters.append(allButton);

  categories.forEach(({ id, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-filter";
    button.setAttribute("role", "tab");
    button.setAttribute("data-filter", id);
    button.setAttribute("aria-selected", "false");
    button.tabIndex = -1;
    button.innerHTML = `${galleryCategoryLabel(id, label)} <span class="gallery-filter-count">(${counts[id] || 0})</span>`;
    galleryFilters.append(button);
  });

  galleryFilters.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".gallery-filter") : null;
    if (!button) {
      return;
    }
    setGalleryFilter(button.getAttribute("data-filter") || "all");
  });

  galleryFilters.addEventListener("keydown", (event) => {
    const tabs = Array.from(galleryFilters.querySelectorAll(".gallery-filter"));
    const currentIndex = tabs.findIndex((tab) => tab.classList.contains("is-active"));
    if (currentIndex < 0) {
      return;
    }

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setGalleryFilter(nextTab.getAttribute("data-filter") || "all");
    nextTab.focus();
  });
}

function initAirbnbGallery() {
  if (!galleryShell) {
    return;
  }

  const data = window.__airbnbGallery;
  if (!data?.items?.length) {
    renderGalleryEmptyMessage();
    return;
  }

  const categories =
    data.categories?.length > 0
      ? data.categories
      : GALLERY_CATEGORY_ORDER.filter((id) =>
          data.items.some((item) => (item.category || item.room) === id)
        ).map((id) => ({
          id,
          label: GALLERY_CATEGORY_LABELS[id] || id,
        }));

  const grouped = groupGalleryItems(data.items);
  galleryState.categories = categories;
  galleryState.sections.clear();
  galleryShell.replaceChildren();

  let globalIndex = 0;
  categories.forEach(({ id, label }) => {
    const items = grouped.get(id) || [];
    if (!items.length) {
      return;
    }

    const section = document.createElement("section");
    section.className = "gallery-category";
    section.dataset.category = id;

    const heading = document.createElement("h3");
    heading.className = "gallery-category-heading";
    heading.textContent = galleryCategoryLabel(id, label);
    section.append(heading);

    const subsections = GALLERY_SUBSECTIONS[id];
    if (subsections) {
      const byRoom = groupGalleryItemsByRoom(items, subsections);
      subsections.forEach((roomId) => {
        const roomItems = byRoom.get(roomId) || [];
        if (!roomItems.length) {
          return;
        }

        const subHeading = document.createElement("h4");
        subHeading.className = "gallery-subsection-heading";
        subHeading.dataset.room = roomId;
        subHeading.textContent = galleryRoomLabel(roomId);
        section.append(subHeading);
        globalIndex = appendGalleryMosaic(section, roomItems, id, globalIndex);
      });
    } else {
      globalIndex = appendGalleryMosaic(section, items, id, globalIndex);
    }

    galleryShell.append(section);
    galleryState.sections.set(id, section);
  });

  const counts = { all: data.items.length };
  categories.forEach(({ id }) => {
    counts[id] = (grouped.get(id) || []).length;
  });

  initGalleryFilters(categories, counts);
  setGalleryFilter("all");
}

function getActiveGalleryMosaic() {
  if (galleryState.activeFilter !== "all") {
    return galleryShell?.querySelector(`[data-category-grid="${galleryState.activeFilter}"]`) || null;
  }
  return galleryShell?.querySelector(".gallery-mosaic") || null;
}

/** Aktualisiert die dynamisch erzeugten Galerie-Texte bei Sprachwechsel. */
function localizeGallery() {
  if (!galleryShell) {
    return;
  }

  // Leermeldung neu rendern, falls die Galerie nicht geladen werden konnte.
  if (galleryShell.querySelector(".gallery-empty")) {
    renderGalleryEmptyMessage();
    return;
  }

  // Filter-Buttons (Label, Zähler beibehalten).
  galleryFilters?.querySelectorAll(".gallery-filter").forEach((button) => {
    const filterId = button.getAttribute("data-filter") || "all";
    const countEl = button.querySelector(".gallery-filter-count");
    const countMarkup = countEl ? countEl.outerHTML : "";
    const label = filterId === "all" ? tr("gallery.all") : galleryCategoryLabel(filterId);
    button.innerHTML = `${label} ${countMarkup}`;
  });

  // Kategorie- und Raum-Überschriften.
  galleryShell.querySelectorAll(".gallery-category").forEach((section) => {
    const id = section.dataset.category;
    const heading = section.querySelector(".gallery-category-heading");
    if (id && heading) {
      heading.textContent = galleryCategoryLabel(id);
    }
  });
  galleryShell.querySelectorAll(".gallery-subsection-heading").forEach((heading) => {
    const roomId = heading.dataset.room;
    if (roomId) {
      heading.textContent = galleryRoomLabel(roomId);
    }
  });

  // „Vergrößern“-Beschriftung der Kacheln.
  galleryShell.querySelectorAll(".gallery-tile-trigger").forEach((trigger) => {
    const title = trigger.dataset.titleText;
    if (title) {
      trigger.setAttribute("aria-label", tr("gallery.enlarge", { title }));
    }
  });
}

initAirbnbGallery();
initLightbox();
initSectionBackgrounds();

if (window.I18N && typeof window.I18N.onChange === "function") {
  window.I18N.onChange(() => {
    localizeGallery();
    localizeLightbox();
  });
}

function updateHeaderOnScroll() {
  if (!siteHeader) {
    return;
  }
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 48);
}

updateHeaderOnScroll();
window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (uploadInput && galleryShell) {
  uploadInput.addEventListener("change", () => {
    const files = Array.from(uploadInput.files || []);
    const targetMosaic = getActiveGalleryMosaic();

    files.forEach((file) => {
      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        return;
      }

      const mediaUrl = URL.createObjectURL(file);
      const tile = document.createElement("article");
      tile.className = "gallery-tile media-upload";

      const badge = document.createElement("span");
      badge.className = "tile-badge";
      badge.textContent = file.type.startsWith("video/") ? "Video-Vorschau" : "Bild-Vorschau";

      const title = document.createElement("h3");
      title.textContent = file.name;

      if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = mediaUrl;
        video.controls = true;
        video.muted = true;
        tile.append(video);
      } else {
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "gallery-tile-trigger lightbox-trigger";
        trigger.setAttribute("data-lightbox-group", "galerie");
        trigger.setAttribute("data-lightbox-src", mediaUrl);
        trigger.setAttribute("data-lightbox-caption", file.name);
        trigger.setAttribute("aria-label", `${file.name} vergrößern`);

        const image = document.createElement("img");
        image.src = mediaUrl;
        image.alt = `Vorschau von ${file.name}`;
        trigger.append(image);
        tile.append(trigger);
      }

      const caption = document.createElement("div");
      caption.className = "gallery-tile-caption";
      caption.append(badge, title);
      tile.append(caption);

      if (targetMosaic) {
        targetMosaic.prepend(tile);
      } else {
        galleryShell.prepend(tile);
      }
    });

    uploadInput.value = "";
  });
}

function showFormStatus(statusElement, message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

/** True, sobald ein echter Web3Forms-Key hinterlegt wurde. */
function isWeb3FormsConfigured() {
  return Boolean(WEB3FORMS_ACCESS_KEY) && WEB3FORMS_ACCESS_KEY !== "DEIN-WEB3FORMS-ACCESS-KEY";
}

/** Baut eine vorausgefüllte mailto:-URL aus den Formularfeldern (Fallback). */
function buildMailtoHref(form, subject) {
  const data = new FormData(form);
  const skip = new Set(["botcheck", "access_key", "subject", "from_name"]);
  const lines = [];
  data.forEach((value, key) => {
    const text = String(value || "").trim();
    if (skip.has(key) || !text) {
      return;
    }
    lines.push(`${key}: ${text}`);
  });
  return (
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(lines.join("\n"))}`
  );
}

function setButtonLoading(button, isLoading) {
  if (!button) {
    return;
  }
  button.disabled = isLoading;
  button.classList.toggle("is-loading", isLoading);
}

function handleFormSubmit(form, statusElement, getSubject) {
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Honeypot: echte Nutzer sehen das Feld nicht, Bots füllen es aus.
    const honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.checked) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const subject = getSubject(form);

    // Kein echter Key → vorausgefüllte E-Mail öffnen und Hinweis zeigen.
    if (!isWeb3FormsConfigured()) {
      window.location.href = buildMailtoHref(form, subject);
      showFormStatus(statusElement, tr("form.mailtoHint"));
      return;
    }

    const formData = new FormData(form);
    formData.set("access_key", WEB3FORMS_ACCESS_KEY);
    formData.set("subject", subject);
    const fromName = String(formData.get("name") || formData.get("contactName") || "").trim();
    formData.set("from_name", fromName || "Arctic Lodge Website");
    formData.delete("botcheck");

    setButtonLoading(submitButton, true);
    showFormStatus(statusElement, tr("form.sending"));

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        // Owner-Anfrage (Web3Forms) ist erfolgreich. Erst jetzt – und nur
        // additiv, nicht-blockierend – die Auto-Bestätigung an die anfragende
        // Person auslösen (in der aktiven Sprache). Fehler werden ignoriert.
        sendAutoReply(form);
        showFormStatus(statusElement, tr("form.success"));
        form.reset();
      } else {
        showFormStatus(statusElement, tr("form.error"));
      }
    } catch (error) {
      showFormStatus(statusElement, tr("form.error"));
    } finally {
      setButtonLoading(submitButton, false);
    }
  });
}

handleFormSubmit(bookingForm, bookingStatus, () => tr("form.subjectBooking"));

handleFormSubmit(contactForm, contactStatus, (form) => {
  const subjectField = String(new FormData(form).get("subject") || "").trim();
  return subjectField || tr("form.subjectContact");
});
