import { Box, Image } from "@chakra-ui/react";
import { usePreview } from "../utils/hooks/usePreview";

const SidebarPreview = () => {
  const { preview } = usePreview();

  return (
    <Box flex="1 0" p={2} shadow="md">
      {preview &&
        (typeof preview === "string" ? (
          <Box
            w="full"
            h="full"
            filter="grayscale(1)"
            backgroundImage={preview}
            backgroundSize="cover"
            backgroundPosition="center center"
            backgroundRepeat="no-repeat"
            color="transparent"
          />
        ) : (
          preview
        ))}
    </Box>
  );
};

export default SidebarPreview;
