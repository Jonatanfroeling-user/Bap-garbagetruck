import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";

import { usePreviousLocation } from "../utils/providers/LocationProvider";

import PageContentLayout from "./PageContentLayout";
import Header, { HeaderHeight } from "./Header";
import { slideVariants } from "../config/slideVariants";

const PageLayout = ({
  pathIndex,
  children,
}: {
  pathIndex: number;
  children: ReactNode;
}) => {
  const { previousIndex, currentIndex } = usePreviousLocation();

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
        <Flex align="start" h="full" w="full" zIndex={0} pt={HeaderHeight}>
          {window.location.href.includes("home") ? (
            children
          ) : (
            <PageContentLayout>{children}</PageContentLayout>
          )}
        </Flex>
      </motion.div>
    </Box>
  );
};

export default PageLayout;
