"""Genera le immagini ottimizzate (AVIF + WebP) in public/images a partire da assets-src/."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

# Sfondi delle sezioni (1920x1080) e foto dei lavori (1000px)
BACKGROUNDS = ["home", "about", "services", "projects", "contacts"]
SIZES_BG = [960, 1600, 1920]
SIZES_WORK = [640, 1000]


def export(img: Image.Image, name: str, widths: list[int]) -> None:
    for w in widths:
        h = round(img.height * w / img.width)
        resized = img.resize((w, h), Image.LANCZOS) if w < img.width else img
        resized.save(OUT / f"{name}-{w}.avif", quality=58, speed=4)
        resized.save(OUT / f"{name}-{w}.webp", quality=80, method=6)


for key in BACKGROUNDS:
    export(Image.open(SRC / f"brt-{key}.jpg").convert("RGB"), key, SIZES_BG)

for i in range(1, 14):
    export(Image.open(SRC / f"brt-{i}-b.jpg").convert("RGB"), f"work-{i}", SIZES_WORK)

# Immagine di anteprima per i social (1200x630)
og = Image.open(SRC / "brt-home.jpg").convert("RGB")
og = og.resize((1200, 675), Image.LANCZOS).crop((0, 22, 1200, 652))
og.save(OUT / "og-image.jpg", quality=85, optimize=True)

# Marchio RINA in bianco, per lo sfondo scuro
cert = Image.open(SRC / "cert.png").convert("RGBA")
white = Image.new("RGBA", cert.size, (255, 255, 255, 0))
white.putalpha(cert.getchannel("A"))
white.save(OUT / "rina-en1090.png", optimize=True)

print("Immagini generate in", OUT)
