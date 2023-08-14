import { Box, Center } from "@chakra-ui/react";

import zoom0 from "../../../assets/map-zoom/zoom-0.png";
import zoom1 from "../../../assets/map-zoom/zoom-1.png";
import zoom2 from "../../../assets/map-zoom/zoom-2.png";
import zoom3 from "../../../assets/map-zoom/zoom-3.png";
import { useStoreMap } from "../../../utils/store/global";
import { zoomLevelsRev } from "../../../utils/helpers";

const detailPreview = [zoom0, zoom1, zoom2, zoom3];
export const zooms = Object.fromEntries(
  zoomLevelsRev.map((i, idx) => [i, detailPreview[idx]])
);

const PrevMapDetail = () => {
  const { currentZoom } = useStoreMap();

  return (
    <Center
      w="full"
      h="full"
      backgroundImage={zooms[currentZoom]}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      color="transparent"
    />
  );
};

export default PrevMapDetail;
