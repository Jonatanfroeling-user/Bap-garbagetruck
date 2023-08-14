// @ts-ignore
import * as L from "leaflet";

const ronseCenter: [number, number] = [50.745, 3.62];
const stepDestail: number = 0.0001;
const timbuktu: [number, number] = [16.7719091, -3.0087272];

const { log, info, warn } = console;

const MAP = L.map("MAP", {
  center: ronseCenter,
  crs: L.CRS.EPSG3857,
  zoom: 16,
  zoomControl: true,
  preferCanvas: false,
});
const tileMap = L.tileLayer("../tiles/{z}/{x}/{y}.png", {
  attribution:
    'Data by &copy; <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_blank" href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  detectRetina: false,
  maxNativeZoom: 17,
  maxZoom: 17,
  minZoom: 15,
  noWrap: false,
  opacity: 1,
  subdomains: "abc",
  tms: false,
}).addTo(MAP);

function createMarker(
  id: string,
  coords: [number, number][],
  color = "#00ff00",
  width = 8
): L.Polyline {
  const marker = L.polyline(coords, {
    bubblingMouseEvents: true,
    color: [color],
    dashArray: null,
    dashOffset: null,
    fill: false,
    fillOpacity: 0,
    fillRule: "evenodd",
    lineCap: "round",
    lineJoin: "round",
    noClip: false,
    opacity: 0.5,
    smoothFactor: 1.0,
    stroke: true,
    weight: width,
  }).addTo(MAP);

  marker.on("click", function (e: L.LeafletMouseEvent) {
    // @ts-ignore
    dom.promptSendRequest(id);
  });
  return marker;
}

/** Helpers */
function sleep(s: number = 0.1): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

function toCoordId(x: number, y: number): string {
  return JSON.stringify([x, y]);
}

function toFixed(nr: number, amt: number = 6): number {
  return +nr.toFixed(amt);
}

function getDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function getDis(a: [number, number], b: [number, number]): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

(JSON as any).copy = (a: any) => JSON.parse(JSON.stringify(a));

declare global {
  interface Array<T> {
    current: number;
    next(): T;
    getCurrent(): number;
  }
}

Object.defineProperty(Array.prototype, "current", {
  value: 0,
  writable: true,
  enumerable: false,
});

Array.prototype.next = function () {
  if (this.current >= this.length - 1) this.current = -1;
  return this[this.current++];
};

Array.prototype.getCurrent = function () {
  return this.current;
};

// js adatoption of python range
function range(n = 1) {
  return [...new Array(n)];
}

function getPosTo(src, targ, dis) {
  const dx = targ[0] - src[0];
  const dy = targ[1] - src[1];
  let angle = Math.atan2(dy, dx);

  return [src[0] + dis * Math.cos(angle), src[1] + dis * Math.sin(angle)];
}

// truck icon
function getIcon(coords) {
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [50, 30],
    },
  });
  const icon = new LeafIcon({
    iconUrl:
      "https://static.vecteezy.com/system/resources/previews/009/384/704/original/garbage-truck-clipart-design-illustration-free-png.png",
  });
  return new L.marker(coords, {
    icon: icon,
  }).addTo(MAP);
}

/** Data */
const loadJsonData = (path = "../data/ronse-streets-filtered.json") =>
  new Promise((resolve, reject) => {
    fetch(path)
      .then((respond) => {
        resolve(respond.json());
      })
      .catch((err) => {
        reject(err);
      });
  });

/** get itermediate points */
function getIntermediate(a: any, b: any) {
  let steps = stepDestail;
  const res = [];
  let dis = Infinity;
  let c: any = null;
  let tracker = 0;

  while (dis > steps) {
    if (tracker > 1000) throw new Error("infinite loop at: getIntermediate");
    c = getPosTo(a, b, tracker);
    dis = getDis(c, b);
    tracker += steps;
    // @ts-ignore
    res.push(c.map((i) => toFixed(i, 6)));
  }
  return res;
}
