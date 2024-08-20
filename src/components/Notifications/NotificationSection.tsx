// NotificationSection.tsx
import React from "react";
import NotificationList from "./NotificationList";
import { NotificationProps } from "./Notification.types";

interface NotificationSectionProps {
  notifications: NotificationProps[];
  loading: boolean;
  onNotificationClick: (id: number) => void;
  activeNotificationId: number | null;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  notifications,
  loading,
  onNotificationClick,
  activeNotificationId,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <NotificationList
        notifications={notifications}
        loading={loading}
        onNotificationClick={onNotificationClick}
        activeNotificationId={activeNotificationId}
      />
    </div>
  );
};

export default NotificationSection;
