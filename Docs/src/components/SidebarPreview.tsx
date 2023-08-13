import { Box, Image } from "@chakra-ui/react";
import { usePreview } from "../utils/hooks/usePreview";

const SidebarPreview = () => {
  const { src } = usePreview();
  return (
    <Box flex="1 0" p={2} shadow="md">
      <Box
        w="full"
        h="full"
        filter="grayscale(1)"
        backgroundImage={src}
        backgroundSize="contain"
        backgroundPosition="center center"
        backgroundRepeat="no-repeat"
        color="transparent"
      />
    </Box>
  );
};

export default SidebarPreview;
