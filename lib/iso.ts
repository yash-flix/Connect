// Isometric projection helpers. World units: x runs right-down, y runs
// left-down, z runs up. Everything renders into SVG user space.

export const COS30 = Math.sqrt(3) / 2;

export type Vec3 = [number, number, number];
export type Vec2 = [number, number];

export function project([x, y, z]: Vec3): Vec2 {
  return [(x - y) * COS30, (x + y) * 0.5 - z];
}

export function points(list: Vec3[]): string {
  return list
    .map((v) => project(v).map((n) => n.toFixed(2)).join(","))
    .join(" ");
}

/** The three visible faces of an axis-aligned box. */
export function boxFaces(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
) {
  return {
    top: points([
      [x, y, z + h],
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    front: points([
      [x, y + d, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ]),
    side: points([
      [x + w, y, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x + w, y, z + h],
    ]),
  };
}

/** SVG transform that lays 2D content flat on the plane z at origin (x, y). */
export function planeMatrix(x: number, y: number, z: number): string {
  const [e, f] = project([x, y, z]);
  return `matrix(${COS30} 0.5 ${-COS30} 0.5 ${e.toFixed(2)} ${f.toFixed(2)})`;
}

export function bounds(list: Vec3[], pad = 0) {
  const pts = list.map(project);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const maxX = Math.max(...xs) + pad;
  const maxY = Math.max(...ys) + pad;
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}
