from __future__ import annotations

import struct
from pathlib import Path

import pytest

BRAND = Path(__file__).parents[1] / "custom_components" / "piyolog" / "brand"


def _png_size(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{path.name} is not a PNG"
    return struct.unpack(">II", data[16:24])


@pytest.mark.parametrize(("name", "size"), [("icon.png", 256), ("icon@2x.png", 512)])
def test_icon_sizes(name: str, size: int) -> None:
    """Home Assistant (2026.3+) shows these as the integration's icon."""
    assert _png_size(BRAND / name) == (size, size)
