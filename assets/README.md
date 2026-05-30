# Assets – Bilder und Videos

Medien für die Website **Lodge in der Arktis**. Stand **30.05.2026**: **116 Airbnb-Fotos** aus `haus-fotos/bilder/von_airbnb/` nach `assets/airbnb/` kopiert, webfreundlich benannt und in Galerie + Lightbox eingebunden. Der Übersichts-Screenshot `01_uebersicht.png` wird bewusst nicht eingebunden (enthielt unter „Terrasse 1“ eine Skandinavien-Karte; siehe Ideenprotokoll 30.05.2026).

## Airbnb-Galerie (`assets/airbnb/`)

| Aspekt | Details |
|--------|---------|
| Anzahl | **116** Bilder (JPG/PNG) |
| Roharchiv | `assets/haus-fotos/bilder/von_airbnb/` |
| Benennung | `NNN-raum.jpg` (z. B. `014-aussen.jpg`, `043-kueche.jpg`) – fortlaufend, nach Raum sortiert |
| Manifest | `gallery.json` + `gallery-data.js` (für `index.html` ohne Build); Feld `category` für Impressionen-Filter |
| Kategorien | 6 Bereiche: Außen & Terrasse (26), Wohnbereich (40), Schlafzimmer (15), Badezimmer (9), Sauna & Wellness (3), Aktivitäten (23) |
| Website | Galerie mit Tab-Filter + Kategorie-Grids; in **Schlafzimmer** / **Badezimmer** Unterüberschriften 1–3 (`script.js` → `initAirbnbGallery()`); Lazy Loading ab Bild 7 |

### Raum-Reihenfolge im Dateinamen

1. `aussen` (26)  
3. `wohnzimmer` (18)  
4. `esszimmer` (15)  
5. `kueche` (7)  
6. `schlafzimmer-1` … `schlafzimmer-3` (15)  
7. `badezimmer-1` (4), `badezimmer-2` (3), `badezimmer-3` (2, Quelle `gaeste_wc`)  
8. `sauna` (3)  
9. `aktivitaeten` (23)

### Hero

| Datei | Verwendung | Quelle |
|-------|------------|--------|
| `hero.jpg` | Hero-Hintergrund + Lightbox | `von_airbnb/aussen/54bb070c-91bf-4d5e-bd77-08afbe4b9753.jpeg` (Holzterrasse mit Wasserblick) |

### Vollständige Bildliste

> Hinweis: `001-uebersicht.png` (Airbnb-Fotorundgang-Screenshot, enthielt die Skandinavien-Karte unter „Terrasse 1“) wurde am 30.05.2026 aus der Galerie entfernt. Die Nummerierung der übrigen Dateien beginnt daher bei `002`.

| Datei | Raum | Verwendung | Quelle |
|-------|------|------------|--------|
| `002-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/07a74241-2212-4126-9cc3-f085e1ec4709.jpeg` |
| `003-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/0bc993b8-e93f-4150-a10f-d3c63f86702c.jpeg` |
| `004-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/0d69ec5d-4378-4548-a8d0-63b18559cba4.jpeg` |
| `005-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/157f4de9-1cd9-4025-9b5d-e13984cdc6e2.jpeg` |
| `006-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/279e4310-ad81-4676-81ec-cd02ee10924c.jpeg` |
| `007-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/2d2ec639-fa84-493a-924b-8812f99f71d4.jpeg` |
| `008-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/2fa2a45c-0270-4958-a55b-f02734c445e0.jpeg` |
| `009-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/326db6d0-50bd-4cbc-b889-bb0f4997c534.jpeg` |
| `010-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/36fafa78-6289-4380-9e04-5951a88db518.jpeg` |
| `011-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/3bf06283-65fb-48b8-ab0f-0af99f79ec2f.jpeg` |
| `012-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/3eda51ca-f1f8-47be-b407-c933f6827e56.jpeg` |
| `013-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/4c174d4c-42bb-4142-b9c7-225c2556f2dc.jpg` |
| `014-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/54bb070c-91bf-4d5e-bd77-08afbe4b9753.jpeg` |
| `015-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/756104fe-ce4e-46a2-8cd9-3ee9050569d3.jpeg` |
| `016-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/76ba5f31-64d6-4fd2-a375-23b48bd7ede6.jpeg` |
| `017-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/99536798-e6df-4c49-ba10-37a41dc6d1b5.jpg` |
| `018-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/9a4b07e1-3009-4041-be21-0bf8cdb13398.jpeg` |
| `019-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/9d18cc21-b20a-477b-8557-bf8a6986c2af.jpeg` |
| `020-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/a7b3a8f4-1e00-4a49-a9c0-51e9a09b35f6.jpeg` |
| `021-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/a90f1a31-3ea1-42d1-881d-48ea069b59a6.jpeg` |
| `022-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/b588fa82-4c0e-4893-938d-5959d6c119c4.jpeg` |
| `023-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/c6660783-fb15-443f-9b00-2dd44d570086.jpg` |
| `024-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/d9a5dc27-8131-4cd3-bac6-033d96695cdf.jpeg` |
| `025-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/da8cb559-2172-4fe4-b74c-761be5f613e5.jpeg` |
| `026-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/e105be85-25f4-4d8c-b1f5-f627f88f99d9.jpeg` |
| `027-aussen.jpg` | Außen & Lage | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/aussen/fc50d6d3-c494-4d48-ba57-732c0774b805.jpeg` |
| `028-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/001.jpeg` |
| `029-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/003.jpeg` |
| `030-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/004.jpeg` |
| `031-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/006.jpeg` |
| `032-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/007.jpeg` |
| `033-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/008.jpeg` |
| `034-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/009.jpeg` |
| `035-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/010.jpeg` |
| `036-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/016.jpeg` |
| `037-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/018.jpeg` |
| `038-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/019.jpeg` |
| `039-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/020.jpeg` |
| `040-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/022.jpeg` |
| `041-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/025.jpeg` |
| `042-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/027.jpeg` |
| `043-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/029.jpeg` |
| `044-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/037.jpeg` |
| `045-wohnzimmer.jpg` | Wohnzimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/wohnzimmer/639a634a-818c-46a3-8bad-833a831396a7.jpeg` |
| `046-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/001.jpeg` |
| `047-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/002.jpeg` |
| `048-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/003.jpeg` |
| `049-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/004.jpeg` |
| `050-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/005.jpeg` |
| `051-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/006.jpeg` |
| `052-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/007.jpeg` |
| `053-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/008.jpeg` |
| `054-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/009.jpeg` |
| `055-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/010.jpeg` |
| `056-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/011.jpeg` |
| `057-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/29a5f86e-5336-4487-b831-c51fbd011fa2.jpeg` |
| `058-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/5c1347b7-47d2-4fd6-90fa-57da5026abda.jpg` |
| `059-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/ab2a162a-1745-4219-ad66-100bf9c7d2f1.jpeg` |
| `060-esszimmer.jpg` | Esszimmer | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/esszimmer/ae1947f7-98e8-4415-87b3-2bb633f97158.jpeg` |
| `061-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/001.jpeg` |
| `062-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/002.jpeg` |
| `063-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/003.jpeg` |
| `064-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/004.jpeg` |
| `065-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/005.jpeg` |
| `066-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/18e7772a-c602-48a9-9441-957d2d25fddd.jpeg` |
| `067-kueche.jpg` | Küche | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/kueche/699ae3f0-b89f-460a-aa30-dcf4a47afeec.jpeg` |
| `068-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/001.jpeg` |
| `069-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/005.jpeg` |
| `070-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/006.jpeg` |
| `071-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/007.jpeg` |
| `072-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/008.jpeg` |
| `073-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/009.jpeg` |
| `074-schlafzimmer-1.jpg` | Schlafzimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_01/010.jpeg` |
| `075-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/003.jpeg` |
| `076-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/004.jpeg` |
| `077-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/24eda3ee-9ae9-418c-8f8d-ecdcec42693d.jpeg` |
| `078-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/5d714d33-9e0a-4a67-891c-116c81985d6b.jpeg` |
| `079-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/dbccea82-c1a6-42c8-a827-f31c8da5cdb1.jpeg` |
| `080-schlafzimmer-2.jpg` | Schlafzimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_02/fd422332-f3ab-4d77-9ef6-a5cdae0fefd8.jpeg` |
| `081-schlafzimmer-3.jpg` | Schlafzimmer 3 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_03/002.jpeg` |
| `082-schlafzimmer-3.jpg` | Schlafzimmer 3 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/schlafzimmer_03/57c23f26-124d-4b55-a101-e0c766d2f43d.jpeg` |
| `083-badezimmer-1.jpg` | Badezimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_01/002.jpeg` |
| `084-badezimmer-1.jpg` | Badezimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_01/003.jpeg` |
| `085-badezimmer-1.jpg` | Badezimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_01/004.jpeg` |
| `086-badezimmer-1.jpg` | Badezimmer 1 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_01/005.jpeg` |
| `086-badezimmer-2.jpg` | Badezimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_02/006.jpeg` |
| `087-badezimmer-2.jpg` | Badezimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_02/007.jpeg` |
| `088-badezimmer-2.jpg` | Badezimmer 2 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/badezimmer_02/008.jpeg` |
| `089-badezimmer-3.jpg` | Badezimmer 3 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/gaeste_wc/001.jpeg` |
| `090-badezimmer-3.jpg` | Badezimmer 3 | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/gaeste_wc/0cfe77da-6097-4d66-bb29-d42bc8e44f81.jpeg` |
| `092-sauna.jpg` | Sauna | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/sauna/2755d9c4-d6af-4ba2-af50-33dffef54f84.jpeg` |
| `093-sauna.jpg` | Sauna | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/sauna/60fc20f4-fccd-4529-8acb-121f94c44451.jpeg` |
| `094-sauna.jpg` | Sauna | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/sauna/bb5bc035-847a-4a08-a6ac-14be3996af09.jpeg` |
| `095-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/07bf5186-48f6-4173-9714-bbba0f56f6d4.jpeg` |
| `096-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/4153c9e0-c319-4689-b38b-f74ee61c8b3c.jpeg` |
| `097-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/41f05bb8-c924-434b-a25f-069549e1f17e.jpeg` |
| `098-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/50721b5c-d20b-463f-b462-65911bf71c29.jpeg` |
| `099-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/5d2921c7-918b-4d50-bf5d-866728846e3f.jpeg` |
| `100-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/64f4ab55-df96-4bc8-a9f3-68ee4b40b804.jpeg` |
| `101-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/668b0f4b-48ce-42d0-8c49-865cd6def3dc.jpeg` |
| `102-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/7b4479a0-7b7e-4489-82ca-e9b756d1f58c.jpeg` |
| `103-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/9170ca37-cb44-42ad-a610-7b3e69ed5d65.jpeg` |
| `104-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/97371779-8636-48df-97c3-995a76569ac2.jpeg` |
| `105-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/a12871f9-f08c-4cde-aad2-d38dfe1a6ca3.jpeg` |
| `106-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/a1ad7630-1886-4ee0-881d-d99d1ffa79b2.jpeg` |
| `107-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/a1fd95e8-b5bb-4534-b916-3669dc5e9807.jpeg` |
| `108-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/b3629cd4-f017-4c91-a500-bec6c87d6154.jpeg` |
| `109-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/b8383be6-6f04-40d6-9c7f-2bebe54e0b8c.jpeg` |
| `110-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/c5e92548-8f8b-4f49-8952-299e4ffa0a58.jpeg` |
| `111-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/c791daa6-7e04-4451-b837-2e12dc114fa3.jpeg` |
| `112-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/c8cbe575-0528-437e-ac9c-b80a0329aa1b.jpeg` |
| `113-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/cd7918ee-c7a4-4a6e-a752-ec41265b9294.jpeg` |
| `114-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/dbb8d906-2486-4ffc-b7e8-6f36514db1e4.jpeg` |
| `115-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/e0b69480-8ef8-42af-b905-9d925301df6a.jpeg` |
| `116-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/e7018c92-18aa-4593-b3c2-cd24535a330b.jpeg` |
| `117-aktivitaeten.jpg` | Aktivitäten & Umgebung | Galerie + Lightbox | `assets/haus-fotos/bilder/von_airbnb/actionen/f3dcc10a-42e1-4be8-9db3-1a22ef5cd0b8.jpeg` |
## Sektions-Hintergründe (`assets/bg/`)

Dezente Hintergrund-Einblendung (~8 % Opazität, lazy load). Stand 30.05.2026 aus **Airbnb-Außen-/Innenmotiven** (max. 1400 px):

| Datei | Sektion | Quelle (Airbnb) |
|-------|---------|-----------------|
| `bg-wasser.jpg` | `#haus` | `aussen/326db6d0-…` (Fjord-Ufer) |
| `bg-aussen.jpg` | `#highlights` | `aussen/0bc993b8-…` (Winter-Fassade) |
| `bg-wohnzimmer.jpg` | `#ausstattung` | `wohnzimmer/037.jpeg` |
| `bg-nordlichter.jpg` | `#preise` | `aussen/c6660783-…` (Nordlichter) |
| `bg-sauna.jpg` | `#bewertungen` | `sauna/001.jpeg` |
| `bg-landschaft.jpg` | `#lage` | `aussen/756104fe-…` (Terrasse/Fjord) |

## Mietwagen-Bilder (Anreise-Sektion)

| Datei | Verwendung |
|-------|------------|
| `car-kompakt.jpg` | Kompaktklasse (Nutzerfoto MG4) |
| `car-suv.jpg` | SUV (Pexels) |
| `car-kombi.jpg` | Kombi (Nutzerfoto VW Passat) |

## Pläne (`assets/plaene/`)

Eigene Sektion `#grundriss` auf der Website: Erd-/Dachgeschoss groß nebeneinander (Lightbox-Gruppe `grundriss`), Planskizze JPG + PDF darunter. Quellen im Archiv `haus-fotos/Unterlagen_zum_Haus/`.

## Roharchiv

**Hinweis (Git):** `assets/kirkenes_bilder_plaene.zip` wird nicht versioniert (identisch zum entpackten Inhalt in `haus-fotos/`). Bei frischem Clone nur `haus-fotos/` nutzen oder ZIP lokal erneut ablegen.

```text
assets/haus-fotos/bilder/von_airbnb/   ← Airbnb-Originale (unverändert)
assets/haus-fotos/bilder/jaana/        ← weitere Gastgeber-Fotos (optional)
```

## Build-Skript

Nach neuen Fotos im Airbnb-Ordner:

```bash
python3 scripts/build-airbnb-assets.py
```

Erzeugt `assets/airbnb/*`, `gallery.json`, `gallery-data.js` und aktualisiert `hero.jpg` sowie `assets/bg/`.

## Upload-Vorschau

Galerie-Formular in `index.html`: temporäre Vorschau nur im Browser, nicht persistent.
