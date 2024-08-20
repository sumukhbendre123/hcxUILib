import React, { useState } from "react";
import NotificationList from "./NotificationList";
import { NotificationProps } from "./Notification.types";

const NotificationSection: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [activeNotificationId, setActiveNotificationId] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch notifications here

  const handleNotificationClick = (id: number) => {
    setActiveNotificationId(id === activeNotificationId ? null : id);
  };

  return (
    <NotificationList
      notifications={notifications}
      loading={loading}
      onNotificationClick={handleNotificationClick}
      activeNotificationId={activeNotificationId}
    />
  );
};

export default NotificationSection;
