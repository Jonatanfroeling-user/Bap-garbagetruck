import { useCallback, useMemo, useState } from "react";
import { Box, Button, Center, Flex, Img, Input, Text } from "@chakra-ui/react";

import bgImg from "../../assets/app-bg.png";
import logoImg from "../../assets/logo.svg";
import { useAuth, useStoreActions } from "../../utils/store/global";
import { getUserIconByColor } from "../../utils/helpers";

const LoginPage = () => {
  const [userIcon, setUserIcon] = useState<string>("");
  const a = useAuth();
  console.log(a);
  const { setAuthState } = useStoreActions();

  const singIn = useCallback(() => {
    if (userIcon) {
      console.log("login");
      setAuthState(true, userIcon);
    }
  }, [userIcon]);

  const avatarSelect = useMemo(
    () =>
      Object.entries(getUserIconByColor()).map(([name, src]) => (
        <Box
          key={`truck-item-avatpicker-${name}`}
          w="80px"
          h="80px"
          border={userIcon === src ? "4px solid #5197fe" : "2px solid white"}
          transition="all 0.2s"
          onClick={() => setUserIcon(src as string)}
          bgImg={src as string}
          backgroundSize={"130%"}
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          borderRadius="md"
          _hover={{
            scale: 1.2,
          }}
          cursor="pointer"
        />
      )),
    [userIcon]
  );

  return (
    <Flex
      height="full"
      w="full"
      bgImg={bgImg}
      bgSize="cover"
      bgPos="center center"
      alignItems="center"
      justifyContent="center"
    >
      <Center
        textAlign="center"
        justifyContent="center"
        bg="#fff9"
        p={9}
        borderRadius="lg"
        flexDir="column"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          Demo
        </Text>

        <Img src={logoImg} w="300px" mt={2} mb={5} />

        {/* <Input
            name="login"
            type="text"
            onChange={onChange as any}
            placeholder="Username.."
            value={input}
            required={true}
          /> */}
        <Text mt={5} fontWeight={500} color={"#111"}>
          Kies een kleur
        </Text>
        <Flex flexDir="row" gap={5}>
          {avatarSelect}
        </Flex>
        <Button
          mt={2}
          bg="primary"
          color="white"
          _hover={{ bg: "primary_light" }}
          size="lg"
          onClick={() => userIcon && singIn()}
          type="button"
        >
          Login
        </Button>
      </Center>
    </Flex>
  );
};

export default LoginPage;
