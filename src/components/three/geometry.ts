import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";

export function createFold(variant: number) {
  const geometry = new BufferGeometry();
  const slices = 192;
  const bands = 22;
  const points: number[] = [];
  const faces: number[] = [];
  const axis = new Vector3();
  const normal = new Vector3();
  const direction = new Vector3();
  const middle = new Vector3();

  for (let i = 0; i <= slices; i++) {
    const u = i / slices;
    const theta = u * Math.PI * (1.63 + variant * .1) - .72;
    const radius = 1.11 + .23 * Math.sin(theta * 2.8 + .65) + .14 * u;
    middle.set(
      radius * Math.cos(theta) + .21 * Math.sin(theta * 1.46),
      2.85 * (u - .5) + .28 * Math.sin(theta * 2.1),
      .84 * radius * Math.sin(theta),
    );
    axis.set(Math.cos(theta), .26 * Math.cos(theta * 2), Math.sin(theta)).normalize();
    normal.set(-.2 * Math.sin(theta), .9, .2 * Math.cos(theta)).normalize();
    const twist = theta * .76 + .42 * Math.sin(theta * 1.9) + variant * .18;
    direction.copy(axis).multiplyScalar(Math.cos(twist)).addScaledVector(normal, Math.sin(twist));
    const width = (.06 + .58 * Math.pow(Math.sin(Math.PI * u), .64)) * (1 + .19 * Math.sin(theta * 3.2));
    for (let j = 0; j <= bands; j++) {
      const t = j / bands * 2 - 1;
      const curve = (.16 + .052 * Math.cos(theta * 3.1)) * t * t * Math.sin(Math.PI * u);
      const seam = .033 * Math.sin(t * Math.PI * 1.8 + theta * 2.1) * Math.sin(Math.PI * u);
      points.push(
        middle.x + direction.x * width * t + axis.x * (curve + seam),
        middle.y + direction.y * width * t + normal.y * (curve + seam),
        middle.z + direction.z * width * t + axis.z * (curve + seam),
      );
      if (i > 0 && j > 0) {
        const a = i * (bands + 1) + j;
        faces.push(a - bands - 2, a - 1, a, a - bands - 2, a, a - bands - 1);
      }
    }
  }
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
  geometry.setIndex(faces);
  geometry.computeVertexNormals();
  return geometry;
}
