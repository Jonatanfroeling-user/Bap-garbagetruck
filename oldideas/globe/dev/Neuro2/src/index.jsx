import {createRoot} from 'react-dom/client';
import React, { StrictMode } from 'react';
import useScript from 'hooks/useScript';
import genRandomTree from 'datasets/random-data'


const container = document.getElementById('graph')
const root = createRoot(container);




// useScript("../../src/libs/react-force-graph-3d.js")
// useScript("../../src/libs/babel-standalone.js")
// useScript("../../src/libs/react.production.min.js")
// useScript("../../src/libs/react-dom.production.min.js")
// useScript("../../src/libs/react-dom.production.min.js")
useScript("../../src/libs/react-force-graph-3d.min.js")



root.render(
    
  <StrictMode>
    <ForceGraph3D 
        graphData={genRandomTree()}
        cooldownTicks={0}
    />,
  </StrictMode>
);






//   <script src="//unpkg.com/react/umd/react.production.min.js"></script>
//   <script src="//unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
//   <script src="//unpkg.com/babel-standalone"></script>

//   <script src="//unpkg.com/react-force-graph-3d"></script>


//   <script src="../datasets/random-data.js"></script>



    
    
