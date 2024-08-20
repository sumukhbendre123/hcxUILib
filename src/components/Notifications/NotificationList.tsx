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
    <div className="relative min-h-screen rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="back flex items-center border-b-2 border-stroke text-left text-2xl font-medium text-black dark:text-white">
        <h2 className="p-3 text-left text-2xl font-medium text-black dark:text-white">
          Notifications
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-x-4">
        <div className="flex flex-col">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              {...notification}
              onClick={() => onNotificationClick(notification.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
