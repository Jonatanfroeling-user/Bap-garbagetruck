import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

function ResetMapButton({  position }) {
    const map = useMap()
    const [inited, setInited] = useState(false)
    useEffect(() => {
        if(inited) return
        
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'leaflet-control-button', container);

        L.DomEvent.disableClickPropagation(button);
        button.innerHTML = '<i class="fa-map-marked-alt"></i>';

        L.DomEvent.on(button, 'click', () => {
            map.setView([51.505, -0.09], 13);
        });

        container.title = 'Reset Map';
        map?.getContainer()?.appendChild(container);
        //setInited(true)

        // Remove the button when the component is unmounted
        return () => {
            map?.getContainer()?.removeChild(container);
        };
    }, [map]);

  return null;
}

export default ResetMapButton;



// import React from 'react';
// import { Button } from 'react-bootstrap';
// import { FaMapMarkedAlt } from 'react-icons/fa';
// import { map } from 'leaflet';
// function ResetMapButton({position, zoom=15}) {

//     const handleClick = () => {
//         map.setView(position, zoom);
//     };

//     return (
//         <Button constiant="light" onClick={handleClick}>
//             <FaMapMarkedAlt /> Reset Map
//         </Button>
//     );
// }

// export default ResetMapButton;