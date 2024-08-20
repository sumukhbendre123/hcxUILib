// NotificationList.tsx
import React from "react";
import Notification from "./Notification";
import { NotificationListProps } from "./Notification.types";
import TransparentLoader from "../../components/TransparentLoader";

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  onNotificationClick,
  activeNotificationId,
}) => {
  if (loading) {
    return <TransparentLoader />;
  }

  return (
    <div className="max-w-md mx-auto mt-6 h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-medium text-black dark:text-white mb-4">
        Notifications
      </h2>
      <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClick={() => onNotificationClick(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
