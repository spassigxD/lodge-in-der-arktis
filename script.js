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
  root.setAttribute("aria-label", "Bildvorschau");
  root.innerHTML = `
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-panel">
      <button type="button" class="lightbox-close" data-lightbox-close aria-label="Schließen">
        <span aria-hidden="true">×</span>
      </button>
      <button type="button" class="lightbox-nav lightbox-prev" aria-label="Vorheriges Bild">
        <span aria-hidden="true">‹</span>
      </button>
      <button type="button" class="lightbox-nav lightbox-next" aria-label="Nächstes Bild">
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
  trigger.setAttribute("aria-label", `${item.title} vergrößern`);

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
      Galerie-Daten konnten nicht geladen werden.
      ${
        isFileProtocol
          ? "Beim direkten Öffnen von <code>index.html</code> blockieren manche Browser lokale Skripte. Bitte einen lokalen Server starten, z.&nbsp;B. <code>python3 -m http.server 8000</code>, und <code>http://localhost:8000</code> öffnen."
          : "Bitte prüfen, ob <code>assets/airbnb/gallery-data.js</code> vorhanden ist und die Seite neu laden."
      }
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
  allButton.innerHTML = `Alle <span class="gallery-filter-count">(${counts.all})</span>`;
  galleryFilters.append(allButton);

  categories.forEach(({ id, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-filter";
    button.setAttribute("role", "tab");
    button.setAttribute("data-filter", id);
    button.setAttribute("aria-selected", "false");
    button.tabIndex = -1;
    button.innerHTML = `${label} <span class="gallery-filter-count">(${counts[id] || 0})</span>`;
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
    heading.textContent = label;
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
        subHeading.textContent = GALLERY_ROOM_LABELS[roomId] || roomId;
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

initAirbnbGallery();
initLightbox();
initSectionBackgrounds();

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

if (bookingForm && bookingStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = String(formData.get("name") || "Vielen Dank");
    const arrival = String(formData.get("arrival") || "");
    const departure = String(formData.get("departure") || "");

    showFormStatus(
      bookingStatus,
      `${name}, Ihre Anfrage für ${arrival} bis ${departure} wurde lokal vorbereitet. ` +
        "Für echten Versand muss später ein Formular-Dienst oder Backend angebunden werden."
    );

    bookingForm.reset();
  });
}

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("contactName") || "Vielen Dank");

    showFormStatus(
      contactStatus,
      `${name}, Ihre Nachricht wurde lokal vorbereitet. ` +
        "Für echten Versand bitte E-Mail-Adresse und Formular-Dienst hinterlegen."
    );

    contactForm.reset();
  });
}
