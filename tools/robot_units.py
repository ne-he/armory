"""Build one robot per ARMORY unit from the existing art.

Run from anywhere: python tools/robot_units.py
Adding a unit: append (id, accent) to UNITS, with the same accent as in armory.js.

Same body, same pose, same framing as generated/robot2_clear.png (the cut the hall
used for every unit before), only the glow (seams, chest core halo, visor, warm
reflections) is re-hued to the unit's accent. Source: generated/robot2.png at full
res, cut with the alpha of robot2_clear.png scaled up (edge pixels taken from the
clean cut so the grey studio backdrop does not halo)."""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "generated"
UNITS = [
    ("01", "#e0a93a"), ("02", "#2e6fe0"), ("03", "#36c2a8"), ("04", "#c9ced6"),
    ("05", "#9b7be0"), ("06", "#8b4fd8"), ("07", "#ff7a1a"), ("08", "#e8742c"),
    ("09", "#e0312e"), ("10", "#37b6c9"), ("11", "#6c5ce7"), ("12", "#10b981"),
    ("13", "#8fd8ff"), ("14", "#3fb27f"), ("15", "#ce1126"),
]


def rgb_to_hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx = a.max(-1)
    mn = a.min(-1)
    d = mx - mn
    h = np.zeros_like(mx)
    nz = d > 1e-6
    rm = nz & (mx == r)
    gm = nz & (mx == g) & ~rm
    bm = nz & ~rm & ~gm
    h[rm] = ((g - b)[rm] / d[rm]) % 6
    h[gm] = ((b - r)[gm] / d[gm]) + 2
    h[bm] = ((r - g)[bm] / d[bm]) + 4
    h = h / 6.0
    s = np.where(mx > 1e-6, d / np.maximum(mx, 1e-6), 0)
    return np.stack([h, s, mx], -1)


def hsv_to_rgb(hsv):
    h, s, v = hsv[..., 0] * 6, hsv[..., 1], hsv[..., 2]
    i = np.floor(h).astype(int) % 6
    f = h - np.floor(h)
    p = v * (1 - s)
    q = v * (1 - s * f)
    t = v * (1 - s * (1 - f))
    out = np.zeros(hsv.shape)
    for k, (R, G, B) in enumerate([(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)]):
        m = i == k
        out[..., 0][m] = R[m]
        out[..., 1][m] = G[m]
        out[..., 2][m] = B[m]
    return out


def smooth(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def main():
    src = np.array(Image.open(ROOT / "robot2.png").convert("RGB")).astype(float) / 255
    cut = Image.open(ROOT / "robot2_clear.png").convert("RGBA")
    W, H = src.shape[1], src.shape[0]
    cut_up = np.array(cut.resize((W, H), Image.LANCZOS)).astype(float) / 255
    alpha = np.clip(cut_up[..., 3], 0, 1)
    edge = smooth(alpha, 0.55, 0.95)[..., None]  # 1 = solid body, 0 = soft edge
    base = src * edge + cut_up[..., :3] * (1 - edge)

    hsv = rgb_to_hsv(base)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    # how "glow orange" a pixel is: hue near amber, weighted by saturation
    dh = np.minimum(np.abs(h - 0.085), 1 - np.abs(h - 0.085))
    w = smooth(s, 0.12, 0.45) * (1 - smooth(dh, 0.06, 0.14))

    (ROOT / "units").mkdir(exist_ok=True)
    for uid, hexc in UNITS:
        tr, tg, tb = (int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5))
        th, ts, _ = rgb_to_hsv(np.array([[tr, tg, tb]]))[0]
        new = hsv.copy()
        new[..., 0] = th
        # keep the glow's own saturation curve, scaled to the accent's saturation
        new[..., 1] = np.clip(s * (ts / 0.85), 0, 1)
        # dark accents (blue, indigo, red) read dimmer than amber at the same V: lift a touch
        lum = 0.2126 * tr + 0.7152 * tg + 0.0722 * tb
        new[..., 2] = np.clip(v * (1 + 0.25 * w * max(0, 0.55 - lum)), 0, 1)
        out = base * (1 - w[..., None]) + hsv_to_rgb(new) * w[..., None]
        img = np.dstack([out, alpha])
        Image.fromarray((np.clip(img, 0, 1) * 255).round().astype(np.uint8), "RGBA").save(
            ROOT / "units" / f"robot-{uid}.webp", "WEBP", quality=82, method=6)
        print(uid, hexc)


if __name__ == "__main__":
    main()
