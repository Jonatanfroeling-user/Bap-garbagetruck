type CoordinateType = [number, number];
type CoordinateObjectType = { x: number; y: number };

export function sleep(s = 0.1) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function toCoordId(x: number, y: number): string {
  return JSON.stringify([x, y]);
}

export function toFixed(nr: number, amt = 6): number {
  return +nr.toFixed(amt);
}

export function randint(a = 0, b = 1): number {
  return a + Math.random() * b;
}

export function getDistance(a: CoordinateObjectType, b: CoordinateObjectType) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function getDis(a: CoordinateType, b: CoordinateType): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

export const jsonCopy = (a: any) => JSON.parse(JSON.stringify(a));

// Array.prototype.current = 0;
// Array.prototype.next = function () {
//   if (this.current >= this.length - 1) this.current = -1;
//   return this[this.current++];
// };

// Array.prototype.getCurrent = function (arr) {
//   return this.current;
// };

// js adatoption of python range
export function range(n = 1) {
  return [...new Array(n)];
}

export function getPosTo(
  src: CoordinateType,
  targ: CoordinateType,
  dis: number
): CoordinateType {
  const dx = targ[0] - src[0];
  const dy = targ[1] - src[1];
  let angle = Math.atan2(dy, dx);

  return [src[0] + dis * Math.cos(angle), src[1] + dis * Math.sin(angle)];
}

/** get itermediate points */
export function getIntermediate(a: CoordinateType, b: CoordinateType) {
  let steps = 3; //stepDestail;
  const res = [];
  let dis = Infinity;
  let c = null;
  let tracker = 0;

  while (dis > steps) {
    if (tracker > 1000) throw new Error("infinite loop at: getIntermediate");
    c = getPosTo(a, b, tracker);
    dis = getDis(c, b);
    tracker += steps;
    res.push(c.map((i) => toFixed(i, 6)));
  }
  return res;
}
