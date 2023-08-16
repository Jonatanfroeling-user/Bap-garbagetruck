import {
  useDisclosure,
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
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { contactsList } from "../../../__mock_data/users";
import { useState } from "react";
import { useAuth, useGlobals } from "../../../utils/store/global";

type OpenTransferRequestProps = {
  data: {
    wayId: any;
    street: any;
  };
  isOpen: boolean;
  onClose?: () => void;
};

export const OpenTransferRequest = ({
  data: { wayId, street },
  isOpen,
  onClose,
}: OpenTransferRequestProps) => {
  const { user } = useAuth();
  const { isDriving } = useGlobals();

  const userNames = contactsList
    .filter((i) => i.name !== user!.name && i.isSelectableForDemo)
    .map((i) => i.name);

  const [selectedUser, setSelectedUser] = useState<any>(userNames[0]);

  const onSubmit = () => {
    if (selectedUser && window._users[selectedUser]) {
      onClose && onClose();

      window._users[selectedUser].recieveTransferRequest(
        wayId,
        street,
        selectedUser
      );
    }
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
              <FormLabel>Kies een collega</FormLabel>
              <Select
                value={selectedUser}
                onChange={({ target }: any) => setSelectedUser(target.value)}
              >
                {userNames.map((i) => (
                  <option key={`selection-item-user-${i}`} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onSubmit}>
              Verzend
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Sluit dialoog
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
