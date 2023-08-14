export const getMapType = (type: string): string => {
  let url = "";
  switch (type) {
    case "offline":
      url = "../../data/tiles/{z}/{x}/{y}.png";
      break;
    case "osm":
      url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      break;
    default:
      url = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
      break;
  }
  return url;
};
