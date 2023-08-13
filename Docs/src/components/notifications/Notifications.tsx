import { Box } from "@chakra-ui/react";
import Title from "../Title";
import { notificationsData } from "../../data/mocks/notifications";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  return (
    <Box mt={2}>
      <Title text={"Meldingen"} size={4} />
      <Box>
        {notificationsData.map((notification) => (
          <NotificationItem
            item={notification}
            key={`notification-item-${notification.title}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Notifications;
