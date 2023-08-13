import { memo, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import { AiFillInfoCircle } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";

import { NotificationType } from "../../types";
import Title from "../Title";

const NotificationItem = ({ item }: { item: NotificationType }) => {
  const specs = useMemo<{ icon: JSX.Element; color: string }>(() => {
    switch (item.type) {
      case "error":
        return {
          icon: <BiSolidError size={"3rem"} />,
          color: "red",
        };
      case "warning":
        return {
          icon: <AiFillInfoCircle size={"3rem"} />,
          color: "primary_orange",
        };
      default:
        return {
          icon: <BsInfoCircleFill size={"3rem"} />,
          color: "primary",
        };
    }
  }, [item.type]);
  return (
    <Flex
      py={6}
      pl={4}
      pr={8}
      mt={2}
      w="fit-content"
      flexDir="row"
      align="center"
      onClick={item.onClick}
      color={specs.color}
      borderRadius={"md"}
      shadow="md"
      className="hoverScale"
      bg="secondary_lightest"
      transformOrigin="left"
    >
      <Box mr={4}>{specs.icon}</Box>
      <Title text={item.title} size={3} color={specs.color} />
    </Flex>
  );
};

export default memo(NotificationItem);
