import { Center } from "@chakra-ui/react";

import base from "../../../assets/map-type/map-type-base.png";
import osm from "../../../assets/map-type/map-type-osm.png";

import { useStoreMap } from "../../../utils/store/global";

const PrevMapType = () => {
  const { type } = useStoreMap();

  return (
    <Center
      w="full"
      h="full"
      backgroundImage={type === "base" ? base : osm}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      color="transparent"
    />
  );
};

export default PrevMapType;
