#!/usr/bin/env python3
"""Render the README card screenshots from the mock harness.

Usage: python3 screenshots.py [OUT_DIR] [CARD ...]

OUT_DIR defaults to docs/images. CARD is one of summary, list, timeline,
compact-formula, compact-sleep (default: all). Needs Chrome (set CHROME to its
binary if it is not in the macOS default place), Pillow, and network access
(the compact card's icons come from the Material Design Icons font on a CDN).
Writes <card>-light-<en|ja>.png with a transparent background.
"""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
CARDS = ["summary", "list", "timeline", "compact-formula", "compact-sleep"]
PORT = 8765
PAD = 16  # device pixels around the card (the screenshots are taken at 2x)
THEMES = ("light",)  # the README uses one image per card; it has a transparent background


def crop(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("RGBA")
    # The page is transparent, so the alpha channel bounds the card and its shadow.
    box = image.getchannel("A").getbbox()
    if box is None:
        raise SystemExit(f"nothing was drawn in {src.name}")
    left, top, right, bottom = box
    padded = (
        max(0, left - PAD),
        max(0, top - PAD),
        min(image.width, right + PAD),
        min(image.height, bottom + PAD),
    )
    image.crop(padded).save(dest, optimize=True)


def main() -> None:
    args = sys.argv[1:]
    out = Path(args.pop(0)) if args and "/" in args[0] else ROOT / "docs" / "images"
    cards = args or CARDS
    unknown = set(cards) - set(CARDS)
    if unknown:
        raise SystemExit(f"unknown card(s): {', '.join(sorted(unknown))}")
    default_chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    chrome = os.environ.get("CHROME", default_chrome)
    out.mkdir(parents=True, exist_ok=True)

    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT)],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        time.sleep(1)
        with tempfile.TemporaryDirectory() as tmp:
            for card in cards:
                for lang in ("en", "ja"):
                    for theme in THEMES:
                        raw = Path(tmp) / f"{card}-{theme}-{lang}.png"
                        page = f"http://localhost:{PORT}/frontend/harness/index.html"
                        url = f"{page}?card={card}&lang={lang}&theme={theme}"
                        subprocess.run(
                            [
                                chrome,
                                "--headless=new",
                                "--disable-gpu",
                                "--hide-scrollbars",
                                "--default-background-color=00000000",
                                "--window-size=520,760",
                                "--virtual-time-budget=8000",
                                "--force-device-scale-factor=2",
                                f"--screenshot={raw}",
                                url,
                            ],
                            check=True,
                            stdout=subprocess.DEVNULL,
                            stderr=subprocess.DEVNULL,
                        )
                        crop(raw, out / raw.name)
                        print(out / raw.name)
    finally:
        server.terminate()


if __name__ == "__main__":
    main()
