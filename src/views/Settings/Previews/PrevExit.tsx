import { Center, Text } from "@chakra-ui/react";

import { useGlobals } from "../../../utils/store/global";

const PrevExit = () => {
  const { isDriving } = useGlobals();

  return (
    <Center w="full" h="full">
      <Text color="gray" fontSize="2xl">
        {isDriving
          ? "Kan niet uit driveMode tijdens het rijden"
          : "Exit driveMode"}
      </Text>
    </Center>
  );
};

export default PrevExit;
