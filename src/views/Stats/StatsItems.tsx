import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import Title from "../../components/Title";

import { RouteIcon } from "../../components/icons/Route";
import { TruckIcon } from "../../components/icons/Truck";

export type StateItemType = {
  color?: string;
  icon: any;
  heading: string;
  progressKey: "route" | "load";
  onClick: () => void;
};

const StatusItems = () => {
  const [progress, setProgress] = useState({
    route: 0,
    load: 0,
  });

  useEffect(() => {}, []);

  const onStatClick = useCallback(() => {}, []);

  const statusDataList: StateItemType[] = useMemo(
    () => [
      {
        icon: RouteIcon,
        heading: "Route",
        progressKey: "route",
        color: "primary_green",

        onClick: onStatClick,
      },
      {
        icon: TruckIcon,
        heading: "Lading",
        progressKey: "load",
        color: "primary_orange",
        onClick: onStatClick,
      },
    ],
    []
  );

  useEffect(() => {
    // animate percentage growth
    const intv = setInterval(() => {
      const { total } = window._progress;
      if (total) {
        setProgress({
          load: +(total / 1.34).toFixed(0),
          route: +total.toFixed(1),
        });
      }
    }, 300);
    return () => clearInterval(intv);
  }, []);

  return (
    <Box pos="relative">
      <UnorderedList styleType="none">
        {statusDataList.map(
          ({ onClick, heading, icon: CustomIcon, color, progressKey }) => (
            <ListItem
              key={`StatsItem-item-id-${heading}`}
              as="div"
              onClick={onClick}
              maxW="60vw"
              px={4}
              cursor="pointer"
              my={5}
            >
              <Flex align="center">
                <Box pr="5">
                  <CircularProgress
                    value={progress[progressKey]}
                    size="120px"
                    thickness="20px"
                    color={progress[progressKey] > 50 ? color : "primary"}
                    className="hoverScale"
                  >
                    <CircularProgressLabel>
                      <Box className="hoverScale">
                        {<CustomIcon boxSize="3rem" />}
                      </Box>
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Title
                  text={`${heading} ${progress[progressKey]}%`}
                  size={3}
                  upper={false}
                />
              </Flex>
            </ListItem>
          )
        )}
      </UnorderedList>
    </Box>
  );
};

export default StatusItems;
