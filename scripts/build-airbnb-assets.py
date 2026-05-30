#!/usr/bin/env python3
"""Copy, rename and optimize Airbnb photos into assets/airbnb/."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_ROOT = ROOT / "assets/haus-fotos/bilder/von_airbnb"
OUT_DIR = ROOT / "assets/airbnb"
MAX_DIM = 2000

# Tour order: exterior → interior → activities
# Hinweis: "01_uebersicht.png" (Airbnb-Fotorundgang-Screenshot mit Skandinavien-Karte)
# wird bewusst NICHT in die Galerie aufgenommen (siehe Ideenprotokoll 30.05.2026).
FOLDER_ORDER = [
    "aussen",
    "wohnzimmer",
    "esszimmer",
    "kueche",
    "schlafzimmer_01",
    "schlafzimmer_02",
    "schlafzimmer_03",
    "badezimmer_01",
    "badezimmer_02",
    "gaeste_wc",
    "sauna",
    "actionen",
]

ROOM_SLUG = {
    "01_uebersicht.png": "uebersicht",
    "aussen": "aussen",
    "wohnzimmer": "wohnzimmer",
    "esszimmer": "esszimmer",
    "kueche": "kueche",
    "schlafzimmer_01": "schlafzimmer-1",
    "schlafzimmer_02": "schlafzimmer-2",
    "schlafzimmer_03": "schlafzimmer-3",
    "badezimmer_01": "badezimmer-1",
    "badezimmer_02": "badezimmer-2",
    # Airbnb-Tour: Gäste-WC = drittes Nasszimmer (kein eigener badezimmer_03-Ordner)
    "gaeste_wc": "badezimmer-3",
    "sauna": "sauna",
    "actionen": "aktivitaeten",
}

ROOM_TITLE = {
    "uebersicht": "Übersicht",
    "aussen": "Außen & Lage",
    "wohnzimmer": "Wohnzimmer",
    "esszimmer": "Esszimmer",
    "kueche": "Küche",
    "schlafzimmer-1": "Schlafzimmer 1",
    "schlafzimmer-2": "Schlafzimmer 2",
    "schlafzimmer-3": "Schlafzimmer 3",
    "badezimmer-1": "Badezimmer 1",
    "badezimmer-2": "Badezimmer 2",
    "badezimmer-3": "Badezimmer 3",
    "sauna": "Sauna",
    "aktivitaeten": "Aktivitäten & Umgebung",
}

# Galerie-Kategorien (Impressionen-Filter)
CATEGORY_ORDER = [
    "aussen",
    "wohnen",
    "schlafzimmer",
    "bad",
    "sauna",
    "aktivitaeten",
]

ROOM_CATEGORY = {
    "uebersicht": "aussen",
    "aussen": "aussen",
    "wohnzimmer": "wohnen",
    "esszimmer": "wohnen",
    "kueche": "wohnen",
    "schlafzimmer-1": "schlafzimmer",
    "schlafzimmer-2": "schlafzimmer",
    "schlafzimmer-3": "schlafzimmer",
    "badezimmer-1": "bad",
    "badezimmer-2": "bad",
    "badezimmer-3": "bad",
    "sauna": "sauna",
    "aktivitaeten": "aktivitaeten",
}

CATEGORY_LABEL = {
    "aussen": "Außen & Terrasse",
    "wohnen": "Wohnbereich",
    "schlafzimmer": "Schlafzimmer",
    "bad": "Badezimmer",
    "sauna": "Sauna & Wellness",
    "aktivitaeten": "Aktivitäten & Umgebung",
}

ROOM_ALT = {
    "uebersicht": "Übersicht der Lodge in der Arktis",
    "aussen": "Außenansicht der Lodge am Wasser in Sør-Varanger",
    "wohnzimmer": "Gemütlicher Wohnbereich mit Kamin in der Lodge",
    "esszimmer": "Essbereich im Ferienhaus",
    "kueche": "Voll ausgestattete Küche der Lodge",
    "schlafzimmer-1": "Schlafzimmer im Ferienhaus",
    "schlafzimmer-2": "Zweites Schlafzimmer mit gemütlicher Einrichtung",
    "schlafzimmer-3": "Drittes Schlafzimmer in der Lodge",
    "badezimmer-1": "Badezimmer im Ferienhaus",
    "badezimmer-2": "Weiteres Badezimmer mit moderner Ausstattung",
    "badezimmer-3": "Gäste-WC – drittes Bad im Erdgeschoss",
    "sauna": "Private Sauna in der Lodge",
    "aktivitaeten": "Aktivitäten und Erlebnisse in der Arktis",
}

HERO_SOURCE = SRC_ROOT / "aussen/54bb070c-91bf-4d5e-bd77-08afbe4b9753.jpeg"
HERO_OUT = ROOT / "assets/hero.jpg"

BG_PICKS = {
    "bg-wasser.jpg": SRC_ROOT / "aussen/326db6d0-50bd-4cbc-b889-bb0f4997c534.jpeg",
    "bg-aussen.jpg": SRC_ROOT / "aussen/0bc993b8-e93f-4150-a10f-d3c63f86702c.jpeg",
    "bg-wohnzimmer.jpg": SRC_ROOT / "wohnzimmer/037.jpeg",
    "bg-sauna.jpg": SRC_ROOT / "sauna/001.jpeg",
    "bg-landschaft.jpg": SRC_ROOT / "aussen/756104fe-ce4e-46a2-8cd9-3ee9050569d3.jpeg",
}

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def sips_size(path: Path) -> tuple[int, int]:
    out = subprocess.check_output(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
        text=True,
    )
    w = h = 0
    for line in out.splitlines():
        if "pixelWidth" in line:
            w = int(line.split()[-1])
        if "pixelHeight" in line:
            h = int(line.split()[-1])
    return w, h


def optimize_image(src: Path, dest: Path) -> tuple[int, int]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        dest.unlink()
    subprocess.run(["cp", str(src), str(dest)], check=True)
    w, h = sips_size(dest)
    long_edge = max(w, h)
    if long_edge > MAX_DIM:
        if w >= h:
            subprocess.run(
                ["sips", "-Z", str(MAX_DIM), str(dest)],
                check=True,
                capture_output=True,
            )
        else:
            subprocess.run(
                ["sips", "-Z", str(MAX_DIM), str(dest)],
                check=True,
                capture_output=True,
            )
        w, h = sips_size(dest)
    if dest.suffix.lower() == ".png" and dest != src:
        pass
    elif src.suffix.lower() in {".jpeg", ".jpg"} and dest.suffix.lower() == ".jpg":
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "85", str(dest)],
            check=True,
            capture_output=True,
        )
    return w, h


def layout_for(w: int, h: int, index: int) -> str:
    if index == 0:
        return "wide"
    if h > w * 1.12:
        return "tall"
    if w > h * 1.35 and index % 11 == 3:
        return "wide"
    return "normal"


def collect_sources() -> list[tuple[Path, str]]:
    items: list[tuple[Path, str]] = []
    for folder in FOLDER_ORDER:
        slug = ROOM_SLUG[folder]
        if folder.endswith(".png"):
            p = SRC_ROOT / folder
            if p.is_file():
                items.append((p, slug))
            continue
        dir_path = SRC_ROOT / folder
        if not dir_path.is_dir():
            continue
        files = sorted(
            [f for f in dir_path.iterdir() if f.is_file() and f.suffix in IMAGE_EXT],
            key=lambda f: f.name.lower(),
        )
        for f in files:
            items.append((f, slug))
    return items


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("*"):
        if old.is_file() and old.name != ".gitkeep":
            old.unlink()

    gallery: list[dict] = []
    counter = 0

    for src, slug in collect_sources():
        counter += 1
        seq = counter
        ext = ".jpg" if src.suffix.lower() != ".png" else ".png"
        name = f"{seq:03d}-{slug}{ext}"
        dest = OUT_DIR / name

        w, h = optimize_image(src, dest)
        title = ROOM_TITLE.get(slug, slug)
        alt = ROOM_ALT.get(slug, title)
        layout = layout_for(w, h, counter - 1)

        category = ROOM_CATEGORY.get(slug, slug)
        gallery.append(
            {
                "file": f"assets/airbnb/{name}",
                "title": title,
                "alt": alt,
                "layout": layout,
                "room": slug,
                "category": category,
                "source": str(src.relative_to(ROOT)),
                "width": w,
                "height": h,
            }
        )

    # Hero
    if HERO_SOURCE.is_file():
        optimize_image(HERO_SOURCE, HERO_OUT)

    # Section backgrounds (1400px)
    bg_dir = ROOT / "assets/bg"
    bg_dir.mkdir(parents=True, exist_ok=True)
    for bg_name, bg_src in BG_PICKS.items():
        if not bg_src.is_file():
            continue
        dest = bg_dir / bg_name
        optimize_image(bg_src, dest)
        w, h = sips_size(dest)
        if max(w, h) > 1400:
            subprocess.run(["sips", "-Z", "1400", str(dest)], check=True, capture_output=True)

    categories = [
        {"id": cat_id, "label": CATEGORY_LABEL[cat_id]}
        for cat_id in CATEGORY_ORDER
        if any(item["category"] == cat_id for item in gallery)
    ]

    manifest = {
        "generated": "2026-05-30",
        "count": len(gallery),
        "hero": "assets/hero.jpg",
        "heroSource": str(HERO_SOURCE.relative_to(ROOT)),
        "categories": categories,
        "items": gallery,
    }

    manifest_path = OUT_DIR / "gallery.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    js_path = OUT_DIR / "gallery-data.js"
    js_path.write_text(
        "window.__airbnbGallery = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )

    print(f"Processed {len(gallery)} Airbnb images → {OUT_DIR}")
    print(f"Hero: {HERO_OUT}")


if __name__ == "__main__":
    main()
