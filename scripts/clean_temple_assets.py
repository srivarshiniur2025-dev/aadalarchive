"""
Aggressive clean of temple moodboard assets → true RGBA frames.
- rembg subject extraction where it preserves structure
- conservative flood-fill fallback for thin gold-line arches
- opening flood for arch interiors
- largest-component + despeckle to kill sheet fragments/halos
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "temple"
OUT = SRC / "clean"

ARCHES = [
    "grand-arch.png",
    "classic-arch.png",
    "arch-large.png",
    "arch-medium.png",
    "arch-small.png",
    "arch-niche.png",
    "arch-double-pillar.png",
    "arch-minimal.png",
    "arch-decorative.png",
    "arch-side-corridor.png",
]

PILLARS = [
    "pillar-main.png",
    "pillar-yali.png",
    "pillar-decorative.png",
    "pillar-sculpted.png",
    "pillar-floral.png",
    "pillar-simple.png",
]

DETAILS = [
    "cornice-detail.png",
    "lotus-motif.png",
    "yali-carving.png",
    "ceiling-bracket.png",
    "base-moulding.png",
    "capital-detail.png",
    "kalasa-top.png",
    "lotus-crest.png",
    "deity-crest.png",
    "border-01.png",
    "border-02.png",
    "border-03.png",
]

# Thin gold-line arches often get destroyed by rembg — flood only
FLOOD_ONLY = {
    "arch-medium.png",
    "arch-small.png",
    "arch-minimal.png",
    "classic-arch.png",
    "arch-decorative.png",
    "arch-side-corridor.png",
}

_session = None


def get_session():
    global _session
    if _session is None:
        from rembg import new_session

        _session = new_session("u2net")
    return _session


def rembg_remove(img: Image.Image) -> Image.Image:
    from rembg import remove

    return remove(img.convert("RGBA"), session=get_session())


def lum(rgb: np.ndarray) -> np.ndarray:
    return 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]


def dist(rgb: np.ndarray, ref: np.ndarray) -> np.ndarray:
    d = rgb.astype(np.float32) - ref.astype(np.float32)
    return np.sqrt((d * d).sum(-1))


def box_var(gray: np.ndarray, k: int = 5) -> np.ndarray:
    from numpy.lib.stride_tricks import sliding_window_view

    p = k // 2
    return sliding_window_view(np.pad(gray, p, mode="edge"), (k, k)).var((-1, -2))


def flood(can: np.ndarray, seeds: list[tuple[int, int]]) -> np.ndarray:
    h, w = can.shape
    seen = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for y, x in seeds:
        y = min(max(y, 0), h - 1)
        x = min(max(x, 0), w - 1)
        if can[y, x] and not seen[y, x]:
            seen[y, x] = True
            q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and can[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))
    return seen


def harden(alpha: np.ndarray, soft: float = 0.4) -> np.ndarray:
    a = alpha.astype(np.float32)
    a = np.where(a >= 100, 255.0, a)
    a = np.where(a < 28, 0.0, a)
    blurred = np.array(
        Image.fromarray(a.astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(soft)),
        dtype=np.float32,
    )
    out = np.where(a >= 250, 255.0, blurred)
    return np.where(out < 12, 0.0, out).astype(np.uint8)


def keep_largest(alpha: np.ndarray, thr: int = 40) -> np.ndarray:
    mask = alpha > thr
    h, w = mask.shape
    labels = np.zeros((h, w), dtype=np.int32)
    lab = 0
    sizes: dict[int, int] = {}
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or labels[y, x]:
                continue
            lab += 1
            q: deque[tuple[int, int]] = deque([(y, x)])
            labels[y, x] = lab
            n = 0
            while q:
                cy, cx = q.popleft()
                n += 1
                for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and labels[ny, nx] == 0:
                        labels[ny, nx] = lab
                        q.append((ny, nx))
            sizes[lab] = n
    if not sizes:
        return alpha
    best = max(sizes, key=sizes.get)
    keep = labels == best
    # Keep secondary components only if large enough (e.g. detached crest)
    for lid, sz in sizes.items():
        if lid != best and sz >= max(80, int(0.01 * h * w)):
            keep |= labels == lid
    keep_i = Image.fromarray((keep.astype(np.uint8) * 255), "L").filter(
        ImageFilter.MaxFilter(3)
    )
    keep = np.array(keep_i) > 0
    out = alpha.copy()
    out[~keep] = 0
    return out


def despeckle(alpha: np.ndarray, min_size: int = 12) -> np.ndarray:
    """Remove tiny opaque islands (sheet debris)."""
    mask = alpha > 40
    h, w = mask.shape
    labels = np.zeros((h, w), dtype=np.int32)
    lab = 0
    sizes: dict[int, int] = {}
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or labels[y, x]:
                continue
            lab += 1
            q: deque[tuple[int, int]] = deque([(y, x)])
            labels[y, x] = lab
            n = 0
            while q:
                cy, cx = q.popleft()
                n += 1
                for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and labels[ny, nx] == 0:
                        labels[ny, nx] = lab
                        q.append((ny, nx))
            sizes[lab] = n
    out = alpha.copy()
    for lid, sz in sizes.items():
        if sz < min_size:
            out[labels == lid] = 0
    return out


def clear_opening(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    h, w = rgb.shape[:2]
    L = lum(rgb.astype(np.float32))
    V = box_var(L, 5)
    gold = (rgb[..., 0] > 90) & (rgb[..., 0] > rgb[..., 2] * 1.12) & (L > 40)
    can = ((alpha < 40) | ((L < 62) & (V < 300))) & ~gold
    cy, cx = int(h * 0.52), int(w * 0.5)
    if not can[cy, cx]:
        found = False
        for r in range(1, max(h, w) // 3):
            for dy in range(-r, r + 1):
                for dx in range(-r, r + 1):
                    y, x = cy + dy, cx + dx
                    if 0 <= y < h and 0 <= x < w and can[y, x] and L[y, x] < 70:
                        cy, cx = y, x
                        found = True
                        break
                if found:
                    break
            if found:
                break
    opening = flood(can, [(cy, cx)])
    opening = (
        np.array(
            Image.fromarray((opening.astype(np.uint8) * 255), "L").filter(
                ImageFilter.MaxFilter(5)
            )
        )
        > 127
    )
    keep = (V > 240) | gold | ((alpha > 200) & (L > 60))
    opening = opening & ~keep
    frac = float(opening.mean())
    if 0.04 < frac < 0.55:
        alpha = alpha.copy()
        alpha[opening] = 0
    return alpha


def flood_outer(rgb: np.ndarray) -> np.ndarray:
    h, w = rgb.shape[:2]
    L = lum(rgb)
    V = box_var(L, 5)
    refs = []
    for y, x in [(3, 3), (3, w - 4), (h - 4, 3), (h - 4, w - 4)]:
        refs.append(np.median(rgb[y - 2 : y + 3, x - 2 : x + 3].reshape(-1, 3), 0))
    similar = np.zeros((h, w), dtype=bool)
    for ref in refs:
        similar |= dist(rgb, ref) < 38
        similar |= (dist(rgb, ref) < 55) & (L > 55) & (V < 120)
    seeds = [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1), (0, w // 2), (h - 1, w // 2)]
    return flood(similar, seeds)


def finalize(arr: np.ndarray) -> Image.Image:
    alpha = arr[..., 3]
    alpha = keep_largest(alpha, thr=35)
    alpha = despeckle(alpha, min_size=18)
    alpha = harden(alpha, soft=0.35)
    # Crush near-black semi-opaque fringe into transparent (kills brown halos on #15161A)
    rgb = arr[..., :3].astype(np.float32)
    L = lum(rgb)
    fringe = (alpha > 0) & (alpha < 200) & (L < 45)
    alpha = alpha.copy()
    alpha[fringe] = 0
    arr = arr.copy()
    arr[..., 3] = alpha
    arr[alpha == 0, :3] = 0
    return Image.fromarray(arr, "RGBA")


def clean_arch_flood(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    rgb = arr[..., :3].astype(np.float32)
    outer = flood_outer(rgb)
    alpha = np.where(outer, 0, 255).astype(np.uint8)
    alpha = clear_opening(arr[..., :3], alpha)
    arr[..., 3] = alpha
    return finalize(arr)


def clean_arch_rembg(img: Image.Image) -> Image.Image:
    rgba = rembg_remove(img)
    arr = np.array(rgba)
    # Also flood-clear residual studio from corners on rembg result
    rgb = arr[..., :3].astype(np.float32)
    # Treat near-transparent as already clear; kill leftover opaque bg islands near edges
    alpha = arr[..., 3]
    outer = flood_outer(rgb)
    # Only apply outer where rembg left weak/medium alpha OR flat dark
    L = lum(rgb)
    kill = outer & ((alpha < 200) | (L < 50))
    alpha = alpha.copy()
    alpha[kill] = 0
    alpha = clear_opening(arr[..., :3], alpha)
    arr[..., 3] = alpha
    out = finalize(arr)
    # Quality gate: if rembg ate too much structure, fall back to flood
    a = np.array(out)[..., 3]
    if (a >= 250).mean() < 0.08:
        return clean_arch_flood(img)
    return out


def clean_pillar(img: Image.Image) -> Image.Image:
    try:
        rgba = rembg_remove(img)
        arr = np.array(rgba)
        if (arr[..., 3] >= 200).mean() < 0.05:
            raise RuntimeError("rembg too thin")
    except Exception:
        arr = np.array(img.convert("RGBA"))
        rgb = arr[..., :3].astype(np.float32)
        outer = flood_outer(rgb)
        arr[..., 3] = np.where(outer, 0, 255).astype(np.uint8)
    # Fill tiny holes
    alpha = arr[..., 3]
    filled = np.array(Image.fromarray(alpha, "L").filter(ImageFilter.MaxFilter(3)))
    near = np.array(Image.fromarray(alpha, "L").filter(ImageFilter.MaxFilter(7)))
    alpha = np.where((alpha < 40) & (near > 180), filled, alpha)
    arr[..., 3] = alpha
    return finalize(arr)


def maybe_mirror_left_pillar(name: str, img: Image.Image) -> Image.Image:
    """arch-medium sometimes loses left pillar — mirror right half if left is empty."""
    if name != "arch-medium.png":
        return img
    arr = np.array(img.convert("RGBA"))
    h, w = arr.shape[:2]
    left = arr[:, : w // 3, 3]
    right = arr[:, 2 * w // 3 :, 3]
    if (left > 100).mean() < 0.08 and (right > 100).mean() > 0.15:
        # Mirror right structure onto left for the pillar column band
        mirrored = np.array(ImageOps.mirror(Image.fromarray(arr, "RGBA")))
        # Blend: take mirrored left third where original is empty
        out = arr.copy()
        band = w // 3
        mask = out[:, :band, 3] < 40
        out[:, :band][mask] = mirrored[:, :band][mask]
        return Image.fromarray(out, "RGBA")
    return img


def run() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name in ARCHES:
        p = SRC / name
        if not p.exists():
            print("skip", name)
            continue
        src = Image.open(p)
        if name in FLOOD_ONLY:
            out = clean_arch_flood(src)
        else:
            out = clean_arch_rembg(src)
        out = maybe_mirror_left_pillar(name, out)
        out = finalize(np.array(out))
        out.save(OUT / name, "PNG", optimize=True)
        a = np.array(out)[..., 3]
        print(
            f"arch   {name:28s} a0={100 * (a == 0).mean():5.1f}% "
            f"a255={100 * (a >= 250).mean():5.1f}% ctr={int(a[a.shape[0] // 2, a.shape[1] // 2])}"
        )
    for name in PILLARS:
        p = SRC / name
        if not p.exists():
            print("skip", name)
            continue
        out = clean_pillar(Image.open(p))
        out.save(OUT / name, "PNG", optimize=True)
        a = np.array(out)[..., 3]
        print(
            f"pillar {name:28s} a0={100 * (a == 0).mean():5.1f}% "
            f"a255={100 * (a >= 250).mean():5.1f}%"
        )
    for name in DETAILS:
        p = SRC / name
        if not p.exists():
            print("skip", name)
            continue
        out = clean_pillar(Image.open(p))
        out.save(OUT / name, "PNG", optimize=True)
        a = np.array(out)[..., 3]
        print(
            f"detail {name:28s} a0={100 * (a == 0).mean():5.1f}% "
            f"a255={100 * (a >= 250).mean():5.1f}%"
        )
    print("Done", OUT)


if __name__ == "__main__":
    run()
