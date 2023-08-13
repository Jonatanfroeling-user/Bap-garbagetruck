import { useEffect, useMemo, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Box, Button, Flex, ListItem, UnorderedList } from "@chakra-ui/react";

import Title from "./Title";
import SquareItem from "./SquareItem";
import { BsArrowsMove } from "react-icons/bs";
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
  const [draggable, setDraggable] = useState(false);
  const [orderedItems, setOrderedItems] = useState<JSX.Element[]>([]);

  const controls = useDragControls();

  const itemsArray = useMemo(
    () =>
      items.map((item, index) => {
        const isSelected = !selected ? index === 0 : selected === item.id;
        return (
          <ListItem
            key={`list-item-${item.id}`}
            // using data-key, we can query this item to force click on it using 'keydown' events
            data-key={`clickable-${item.id}`}
            as="div"
            onClick={() => {
              onSelect(item.id);
              item.onClick();
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
                >
                  {item.children}
                </SquareItem>
              </Box>
              <Title text={item.text} size={isSelected ? 4 : 3} />
            </Flex>
          </ListItem>
        );
      }),
    [selected]
  );

  useEffect(() => {
    setOrderedItems(itemsArray);
  }, [itemsArray]);

  return (
    <Box pos="relative">
      {changableOrder && (
        <Box pos="absolute" left="700px" zIndex={20}>
          <Button
            colorScheme={draggable ? "green" : "gray"}
            p={2}
            _hover={{}}
            onClickCapture={() => setDraggable((prev) => !prev)}
          >
            <BsArrowsMove color={draggable ? "white" : "black"} size="md" />
          </Button>
        </Box>
      )}
      <UnorderedList styleType="none">
        <Reorder.Group
          axis="y"
          values={orderedItems}
          onReorder={setOrderedItems}
          layoutScroll
          style={{ overflowY: "scroll" }}
        >
          {orderedItems.map((item, index) => (
            <Reorder.Item
              key={item.key}
              value={item}
              dragListener={index ? draggable : false}
              dragControls={controls}
              transition={{}}
            >
              {item}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </UnorderedList>
    </Box>
  );
};
