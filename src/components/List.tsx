import { useEffect, useMemo, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Box, Button, Flex, ListItem, UnorderedList } from "@chakra-ui/react";

import Title from "./Title";
import SquareItem from "./SquareItem";
import { ListItemType } from "../types";

type ItemsLitProps = {
  items: ListItemType[];
  onSelect: (itemId: string) => () => void;
  selected: string;
  changableOrder?: boolean;
  itemsAreStats?: boolean;
};

export const ItemsList = ({
  items,
  onSelect,
  selected,
  changableOrder = false,
}: ItemsLitProps) => {
  return (
    <Box pos="relative" mb="80px">
      <UnorderedList styleType="none">
        <>
          {items.map((item, index) => {
            const isSelected = selected === item.id;
            return (
              <ListItem
                key={`list-item-${item.id}`}
                // using data-key, we can query this item to force click on it using 'keydown' events
                as="div"
                onClick={() => {
                  if (isSelected && item.onClick) {
                    item.onClick();
                  }
                  !isSelected && onSelect(item.id)();
                }}
                borderBottom="1px"
                borderColor="border"
                maxW="60vw"
                p={isSelected ? 6 : 4}
                backgroundColor={isSelected ? "selected" : ""}
                cursor="pointer"
                _hover={{ background: "selected" }}
              >
                <Flex align="center">
                  <Box pr={isSelected ? 8 : 5}>
                    <SquareItem
                      size={isSelected ? 4 : 3}
                      outline={item.outline}
                      background={item.background}
                      icon={item.icon}
                      bgImg={item.img}
                      data-key={`clickable-${item.id}`}
                    >
                      {item.children}
                    </SquareItem>
                  </Box>
                  <Title text={item.text} size={isSelected ? 4 : 3} />
                </Flex>
              </ListItem>
            );
          })}
        </>
      </UnorderedList>
    </Box>
  );
};
