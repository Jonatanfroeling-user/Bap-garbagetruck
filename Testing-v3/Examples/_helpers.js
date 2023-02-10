const TODO = {}

const signs = 'ABCDEF0123456789'
const rcolor = () => {
    return "#" + new Array(6).fill('').map(_ => {
        return signs[Math.floor(Math.random() * signs.length)]
    }).join('')
}


const addPin = (_map, points) => {
    const marker = L.polyline(
        points, {
            "bubblingMouseEvents": true,
            "color": [rcolor()],
            "dashArray": null,
            "dashOffset": null,
            "fill": false,
            "fillColor": [rcolor()],
            "fillOpacity": 0.2,
            "fillRule": "evenodd",
            "lineCap": "round",
            "lineJoin": "round",
            "noClip": false,
            "opacity": 1,
            "smoothFactor": 1.0,
            "stroke": true,
            "weight": 3
        }
    ).addTo(_map);
    // marker.on('mouseover',function(ev) {
    //     ev.target.openPopup();
    //   });
    marker.on('onclick',function(ev) {
        ev.target.openPopup();
      });
}