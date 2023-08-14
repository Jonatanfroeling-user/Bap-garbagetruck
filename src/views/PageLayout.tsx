import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";

import { usePreviousLocation } from "../utils/providers/LocationProvider";

import PageLayoutContent from "./PageLayoutContent";
import Header, { HeaderHeight } from "./Header";
import { slideVariants } from "../config/slideVariants";
import { PreviewProvider } from "../utils/providers/previewProvider";
import { useGlobals } from "../utils/store/global";

// Provides padding and motion effect fo each page
const PageLayout = ({
  pathIndex,
  children,
}: {
  pathIndex: number;
  children: ReactNode;
}) => {
  const { previousIndex, currentIndex } = usePreviousLocation();
  const { hideHeader } = useGlobals();

  const isForwardNavigation =
    pathIndex < currentIndex ||
    (currentIndex === 0 && previousIndex === 4) ||
    (currentIndex === 4 && previousIndex === 0);

  return (
    <Box w="full" h="full">
      <Header />

      <motion.div
        variants={slideVariants}
        initial={isForwardNavigation ? "hiddenRight" : "hiddenLeft"}
        animate="visible"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Flex
          align="start"
          h="full"
          w="full"
          zIndex={0}
          pt={hideHeader ? 0 : HeaderHeight}
        >
          {window.location.href.includes("home") ? (
            // home does not need PageLayoutContent as it needds to be a full width map
            children
          ) : (
            <PageLayoutContent>{children}</PageLayoutContent>
          )}
        </Flex>
      </motion.div>
    </Box>
  );
};

export default PageLayout;
