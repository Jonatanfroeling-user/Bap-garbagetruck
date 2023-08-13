import { Box } from "@chakra-ui/react";

import MapElement from "./Map";
import PageLayout from "../../PageLayout";

const HomePage = ({ pathIdx }: { pathIdx: number }) => {
  return (
    <PageLayout pathIndex={pathIdx}>
      <Box h="100%" w="100%">
        {/* <MapElement /> */}
      </Box>
    </PageLayout>
  );
};

export default HomePage;
