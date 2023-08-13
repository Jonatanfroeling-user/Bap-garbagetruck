import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import { statusDataList } from "../../../data/mocks/status";
import Title from "../../../components/Title";

const StatusItems = () => {
  const [values, setValues] = useState(statusDataList.map((i) => 0));

  useEffect(() => {
    // animate percentage growth
    setValues(statusDataList.map((i) => i.percentage));
  }, []);

  return (
    <Box pos="relative">
      <UnorderedList styleType="none">
        {statusDataList.map(
          ({ onClick, heading, icon: CustomIcon, color }, index) => (
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
                    value={values[index]}
                    size="120px"
                    thickness="20px"
                    color={values[index] > 50 ? color : "primary"}
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
                  text={`${heading} ${values[index]}%`}
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
