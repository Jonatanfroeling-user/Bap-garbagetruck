import { memo } from "react";
import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { HeaderItemType } from "../../types";

const HeaderItem = ({ path, icon, isSelected }: HeaderItemType) => (
  <Center
    as={Link}
    to={path}
    flex="1 1 auto"
    bg="white"
    cursor="pointer"
    _hover={{ backgroundColor: "selected" }}
    transition="all 0.2s"
    outline={isSelected ? "3px solid" : "0.5px solid"}
    outlineColor={isSelected ? "primary" : "border"}
    zIndex={Number(isSelected)}
  >
    {icon}
  </Center>
);

export default memo(HeaderItem);
