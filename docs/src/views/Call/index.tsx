import { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import { Box, Button, Center, Text } from "@chakra-ui/react";

import { ContactType } from "../../types";
import SquareItem from "../../components/SquareItem";
import { FaPhoneAlt } from "react-icons/fa";

const CallPage = ({
  user,
  onClose,
}: {
  user: ContactType;
  onClose: () => void;
}) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const makeDummyCall = useCallback(async () => {
    const resp: boolean = await new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("http:false//api.garbagetrucks/call/user/fromt/to")
          .then(({ data }: any) => {
            if (data) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((e) => {
            resolve(false);
          });
      }, 1100);
    });

    setConnected(resp);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    makeDummyCall();
  }, []);

  useEffect(() => {
    if (!isLoading && !connected) {
      setTimeout(() => {
        onClose();
      }, 1300);
    }
  }, [isLoading, connected]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        zIndex: "9999999",
      }}
    >
      <Box
        pos="fixed"
        top={0}
        left={0}
        w="100vw"
        height="100vh"
        bg="radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(59,59,59,1) 100%)"
        zIndex="9999999"
      >
        <Center w="full" h="full" flexDir="column" gap={14}>
          {isLoading ? (
            <Loader type="ball-pulse" active={true} />
          ) : connected ? (
            <Box scale={2}>
              <Loader type="line-scale-pulse-out-rapid" active={true} />
            </Box>
          ) : (
            <Text color="primary_orange" fontSize="4xl" fontWeight={600}>
              Momenteel niet beriekbaar
            </Text>
          )}
          <Box _hover={{ scale: 1.1 }} onClick={onClose}>
            <SquareItem
              size={4}
              background="primary_orange"
              icon={FaPhoneAlt}
              outline="transparent"
            />
          </Box>
        </Center>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </motion.div>
  );
};

export default CallPage;
