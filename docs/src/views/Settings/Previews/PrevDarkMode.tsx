import { Center, Text } from "@chakra-ui/react";

import dark from "../../../assets/themes/mode-dark.png";
import light from "../../../assets/themes/mode-light.png";
import { useStoreTheme } from "../../../utils/store/global";

const PrevDarkMode = () => {
  const { darkMode } = useStoreTheme();

  return (
    <Center
      w="full"
      h="full"
      filter="grayscale(1)"
      backgroundImage={darkMode ? dark : light}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      color="transparent"
    >
      <Text color="gray" fontSize="2xl">
        {darkMode ? "Donker" : "Licht"}
      </Text>
    </Center>
  );
};

export default PrevDarkMode;
