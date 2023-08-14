import { useCallback, useMemo, useState } from "react";
import { Box, Button, Center, Flex, Img, Text } from "@chakra-ui/react";

import bgImg from "../../assets/app-bg.png";
import logoImg from "../../assets/logo.svg";
import { useStoreActions } from "../../utils/store/global";
import { getUserIconByColor } from "../../utils/helpers";

const LoginPage = () => {
  const [userIcon, setUserIcon] = useState<string>("");
  const { setAuthState } = useStoreActions();

  const singIn = useCallback(() => {
    if (userIcon) {
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
          border={userIcon === src ? "4px solid #5197fe" : "1px solid white"}
          transition="all 0.2s"
          onClick={() => setUserIcon(src as string)}
          bgImg={src as string}
          backgroundSize={"120%"}
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          borderRadius="md"
          opacity={userIcon === src ? 1 : 0.8}
          _hover={{
            backgroundSize: "140%",
          }}
          bgColor={name}
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
        <Flex flexDir="row" gap={5} mb={12}>
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
          transform={"scale(1.5)"}
        >
          Start
        </Button>
      </Center>
    </Flex>
  );
};

export default LoginPage;
