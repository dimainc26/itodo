// schiarisce un hex verso il bianco
export const lighten = (hex: string, p: number) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const toDec = (s: string) => parseInt(s, 16);
  const toHex = (n: number) =>
    Math.min(255, Math.max(0, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  const r = toDec(m[1]),
    g = toDec(m[2]),
    b = toDec(m[3]);
  const R = toHex(r + (255 - r) * p);
  const G = toHex(g + (255 - g) * p);
  const B = toHex(b + (255 - b) * p);
  return `#${R}${G}${B}`;
};
