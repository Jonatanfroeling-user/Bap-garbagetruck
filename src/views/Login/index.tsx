import { useCallback, useMemo, useState } from "react";
import { Box, Button, Center, Flex, Img, Input, Text } from "@chakra-ui/react";

import bgImg from "../../assets/app-bg.png";
import logoImg from "../../assets/logo.svg";
import { useStoreActions } from "../../utils/store/global";
import { contactsList } from "../../__mock_data/users";
import { ContactType } from "../../types";

const LoginPage = () => {
  const [selectedUser, setsSlectedUser] = useState<ContactType | null>(null);
  const { setAuthState } = useStoreActions();

  const onCLick = useCallback(
    (user: ContactType) => () => {
      setsSlectedUser(user);
    },
    []
  );
  const singIn = useCallback(() => {
    if (selectedUser) {
      setAuthState(true, selectedUser);
    }
  }, [selectedUser]);

  const avatarSelect = useMemo(
    () =>
      contactsList.map((user) => (
        <Box
          key={`truck-item-avatar-picker-${user.id}`}
          w="80px"
          h="80px"
          border={
            selectedUser?.id === user.id
              ? "4px solid #5197fe"
              : "1px solid white"
          }
          transition="all 0.2s"
          onClick={onCLick(user)}
          bgImg={user.truckIcon}
          backgroundSize={"120%"}
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          borderRadius="md"
          opacity={selectedUser?.id === user.id ? 1 : 0.8}
          _hover={{
            backgroundSize: "140%",
          }}
          bgColor={user.color}
          cursor="pointer"
        />
      )),
    [selectedUser]
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
        <Box
          my={2}
          fontWeight={800}
          borderWidth={"2px"}
          borderColor={selectedUser?.color || "#eee"}
          transition="all 0.2s"
          w="8rem"
          textShadow="md"
          textAlign="center"
          borderRadius="md"
          py={1}
        >
          {selectedUser?.name ?? "Select"}
        </Box>
        <Button
          mt={10}
          bg="primary"
          color="white"
          _hover={{ bg: "primary_light" }}
          size="lg"
          onClick={() => selectedUser && singIn()}
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
