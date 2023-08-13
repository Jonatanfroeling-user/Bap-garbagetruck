import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import HeaderItem from "./HeaderItem";
import { routes } from "../../Routes";
import { useCurrentPath } from "../../utils/hooks/useCurrentPath";

export const HeaderHeight = "100px";

const Header = () => {
  const { currentPath } = useCurrentPath();

  const handleHorizontalKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      // Concept is to put the 2D routes array horizontal and nivate between them using the index
      if (key === "ArrowRight") {
        const idx = routes.findIndex(({ path }) => path === currentPath) + 1;
        const { path } = idx >= routes.length ? routes[0] : routes[idx];
        window.location.hash = path;
      } else if (key === "ArrowLeft") {
        const idx = routes.findIndex(({ path }) => path === currentPath) - 1;
        const { path } = idx < 0 ? routes[routes.length - 1] : routes[idx];

        window.location.hash = path;
      }
    },
    [currentPath]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleHorizontalKeyPress);

    return () => {
      window.removeEventListener("keydown", handleHorizontalKeyPress);
    };
  }, [handleHorizontalKeyPress]);

  return (
    <Box
      w="100%"
      position="fixed"
      top={0}
      bg="white"
      borderBottom="1px solid gray"
      zIndex={999999}
    >
      <Flex
        flexDir="row"
        justifyContent="space-between"
        width="100%"
        height={HeaderHeight}
        flexWrap="wrap"
        gap="1px"
      >
        {routes.map(({ path, icon }) => (
          <HeaderItem
            key={`header-item-${path}`}
            icon={icon}
            path={path}
            isSelected={path === currentPath}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Header;
