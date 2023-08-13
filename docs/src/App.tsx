import { HashRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import ToastProvider from "./utils/providers/ToastProvider";
import customTheme from "./config/theme";
import Routes from "./Routes";
import { LocationProvider } from "./utils/providers/LocationProvider";

const App = () => (
  <Router>
    {/* enalbe usage of chakra ui */}
    <ChakraProvider theme={customTheme}>
      {/* react-toastify */}
      <ToastProvider>
        {/* custom: a location tracker hook */}
        <LocationProvider>
          <Routes />
        </LocationProvider>
      </ToastProvider>
    </ChakraProvider>
  </Router>
);

export default App;
