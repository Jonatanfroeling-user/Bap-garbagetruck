import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState<string>("00:00");

  useEffect(() => {
    const internval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours()}:${now.getMinutes()}`);
    }, 1000);
    return () => clearInterval(internval);
  }, []);

  return (
    <Box py={3} px={4}>
      <Box fontFamily="monospace" fontSize="xl" textAlign="center">
        {time}
      </Box>
    </Box>
  );
};
