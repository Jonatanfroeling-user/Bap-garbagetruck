import { ReactNode, useMemo } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import Title from "../components/Title";
import { useCurrentPath } from "../utils/hooks/useCurrentPath";
import SidebarPreview from "../components/SidebarPreview";
import { useLocation } from "react-router-dom";
import { routes } from "../Routes";

type PageContentLayoutProps = {
  children: ReactNode;
};

// provides a styled layout wrapper for a page
const PageContentLayout = ({ children }: PageContentLayoutProps) => {
  const { currentPage } = useCurrentPath();
  const location = useLocation();

  const requiredPreview = useMemo(
    () =>
      routes.find((route) => route.path === location.pathname)?.requirePreview,
    [location.pathname]
  );
  return (
    <Flex p={8} h="full" w="full" justify="center" align="center">
      <Box
        bg="white"
        boxShadow="xl"
        h="full"
        w="full"
        borderEndEndRadius={10}
        borderEndStartRadius={10}
        p="30px"
        pt="40px"
      >
        <Flex flexDir="column" h="full" overflow="hidden">
          <Box mb={3}>
            <Title text={currentPage} size={4} upper={true} />
          </Box>
          <Flex flexDir="row" w="full" h="full" flex="1">
            <Box
              w={requiredPreview ? "60%" : "80%"}
              pr={10}
              overflowY="auto"
              overflowX="hidden"
            >
              {children}
            </Box>
            {requiredPreview && <SidebarPreview />}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PageContentLayout;
