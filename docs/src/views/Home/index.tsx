import { Box } from "@chakra-ui/react";

import MapElement from "../Map/Map";
import PageLayout from "../PageLayout";
import MapContainer from "../Map/MapContainer";

const HomePage = ({ pathIdx }: { pathIdx: number }) => {
  return (
    <PageLayout pathIndex={pathIdx}>
      <Box h="100%" w="100%">
        <MapContainer>
          <MapElement />
        </MapContainer>
      </Box>
    </PageLayout>
  );
};

export default HomePage;
