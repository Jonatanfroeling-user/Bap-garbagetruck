import { HashRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import ToastProvider from "./utils/providers/ToastProvider";
import { LocationProvider } from "./utils/providers/LocationProvider";
import { PreviewProvider } from "./utils/providers/previewProvider";
import customTheme from "./config/theme";
import Routes from "./Routes";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "loaders.css/src/animations/ball-pulse.scss";
import "loaders.css/src/animations/line-scale-pulse-out-rapid.scss";

const App = () => (
  <Router>
    {/* enalbe usage of chakra ui */}
    <ChakraProvider theme={customTheme}>
      {/* react-toastify */}
      <ToastProvider>
        {/* custom: a location tracker hook */}
        <LocationProvider>
          <PreviewProvider>
            <Routes />
          </PreviewProvider>
        </LocationProvider>
      </ToastProvider>
    </ChakraProvider>
  </Router>
);

export default App;
