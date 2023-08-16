import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import { useAuth, useGlobals } from "../../../utils/store/global";
import { current } from "immer";

type RecieveTransferRequestProps = {
  data: {
    wayId: string;
    street: any;
    to: string;
  };
  isOpen: boolean;
  onClose?: () => void;
};

export const RecieveTransferRequest = ({
  data,
  isOpen,
  onClose,
}: RecieveTransferRequestProps) => {
  const { isDriving } = useGlobals();

  const onSubmit = (accepted: boolean) => () => {
    onClose && onClose();
    window._users.currentUser.recieveTransferResponse(
      accepted ? data : undefined
    );

    window._users[data.to].recieveTransferResponse(accepted ? data : undefined);
    window._users.currentUser.recieveTransferResponse(accepted);
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose || (() => undefined)}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verzoek hulp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isDriving && (
              <Alert status="warning">
                <AlertIcon /> Best je wagen stopped om een verzoek te doen.
              </Alert>
            )}
            <FormControl my={8}>
              <FormLabel>Je hebt een verzoek van een collega</FormLabel>
              <UnorderedList listStyleType="none">
                <ListItem>{data.to}</ListItem>
              </UnorderedList>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onSubmit(true)}>
              Accepteer
            </Button>
            <Button variant="ghost" onClick={onSubmit(false)}>
              Sluiten
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
