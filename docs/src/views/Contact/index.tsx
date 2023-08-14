import { useCallback, useMemo } from "react";

import { getColorsByContact } from "../../utils/helpers";
import { contactsList } from "../../__mock_data/users";

import PageLayout from "../PageLayout";
import { ItemsList } from "../../components/List";
import useSelection from "../../utils/hooks/useSelection";

import { ListItemType } from "../../types";
import CallPage from "../Call";
import { useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

const ContactPage = ({ pathIdx }: { pathIdx: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const contacts = useMemo<ListItemType[]>(
    () =>
      contactsList.map((contact): ListItemType => {
        const { background, outline } = getColorsByContact(
          contact.type,
          contact.role
        );
        return {
          id: contact.id,
          icon: contact.icon,
          onClick: onOpen,
          text: contact.name,
          background: background,
          outline: outline,
          img: contact.avatar,
        };
      }),
    []
  );

  const { selected, onSelect } = useSelection(contacts);

  return (
    <>
      <AnimatePresence>
        {selected && isOpen && (
          <CallPage
            user={contactsList.find((u) => u.id === selected)!}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
      <PageLayout pathIndex={pathIdx}>
        <ItemsList items={contacts} onSelect={onSelect} selected={selected} />
      </PageLayout>
    </>
  );
};

export default ContactPage;
