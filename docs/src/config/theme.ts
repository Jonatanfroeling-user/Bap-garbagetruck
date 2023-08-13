import { extendTheme } from "@chakra-ui/react";

const theme: Record<string, any> = {
  colors: {
    primary: "#5197fe",
    primary_light: "#bed8ff",

    primary_green: "#009f00",
    primary_orange: "#f38800",

    secondary: "#212121",
    secondary_md: "#515151",
    secondary_light: "#aaa",
    secondary_lightest: "#eee",

    border: "#99a",
    selected: "#eee",

    boxShadow: "0 2px 5px 3px #3337",

    gray: {
      default: "#212121",
      50: "#2227",
      200: "#555",
      500: "#777",
    },
    pinkey: "#ff4400",
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  components: {
    // def default border color for all components using foundations
    FoundationalStyles: {
      borders: {
        "1px": "1px solid #555",
        "2px": "2px solid #555",
        "3px": "3px solid #555",
        "1px solid": "1px solid #555",
      },
    },
  },
};

export default extendTheme(theme);
