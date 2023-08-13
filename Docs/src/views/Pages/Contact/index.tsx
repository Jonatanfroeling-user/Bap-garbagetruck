import { useCallback, useMemo } from "react";

import { getColorsByContact } from "../../../utils/helpers";
import { contactsList } from "../../../data/mocks/contacts";

import PageLayout from "../../PageLayout";
import { ItemsList } from "../../../components/List";
import useSelection from "../../../utils/hooks/useSelection";

import { ContactType, ListItemType } from "../../../types";

const ContactPage = ({ pathIdx }: { pathIdx: number }) => {
  const onContactClick = useCallback(
    (contact: ContactType) => console.log("contact clicked", contact),
    []
  );

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
          onClick: () => onContactClick(contact),
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
    <PageLayout pathIndex={pathIdx}>
      <ItemsList items={contacts} onSelect={onSelect} selected={selected} />
    </PageLayout>
  );
};

export default ContactPage;
