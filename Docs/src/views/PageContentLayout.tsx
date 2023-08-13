import { ReactNode } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import Title from "../components/Title";
import { useCurrentPath } from "../utils/hooks/useCurrentPath";
import { PreviewProvider } from "../utils/providers/previewProvider";
import SidebarPreview from "../components/SidebarPreview";

type PageContentLayoutProps = {
  children: ReactNode;
};

const PageContentLayout = ({ children }: PageContentLayoutProps) => {
  const { currentPage } = useCurrentPath();
  return (
    <PreviewProvider>
      <Flex px={8} pb={8} h="full" w="full" justify="center" align="center">
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
          <Flex flexDir="column" h="full">
            <Box mb={3}>
              <Title text={currentPage} size={4} upper={true} />
            </Box>
            <Flex flexDir="row" w="full" h="full" flex="1">
              <Box w="60%" pr={10} overflowY="auto" overflowX="hidden">
                {children}
              </Box>
              <SidebarPreview />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </PreviewProvider>
  );
};

export default PageContentLayout;
