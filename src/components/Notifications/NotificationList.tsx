// NotificationList.tsx
import React from "react";
import Notification from "./Notification";
import { NotificationListProps } from "./Notification.types";
import TransparentLoader from "../../components/TransparentLoader";

// NotificationList component renders a list of notifications with optional loading state
const NotificationList: React.FC<NotificationListProps> = ({
  notifications, // Array of notifications to display
  loading, // Boolean indicating if the notifications are currently loading
  onNotificationClick, // Callback function to handle click events on a notification
  activeNotificationId, // ID of the currently active notification (or null if none)
}) => {
  // If loading, display a loader component
  if (loading) {
    return <TransparentLoader />;
  }

  return (
    <div className="max-w-md mx-auto mt-6 h-screen bg-gray-100 dark:bg-gray-900">
      {/* Section header */}
      <h2 className="text-2xl font-medium text-black dark:text-white mb-4">
        Notifications
      </h2>
      <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {/* Render each notification */}
        {notifications.map((notification) => (
          <Notification
            key={notification.id} // Unique key for each notification
            {...notification} // Spread operator to pass all properties to Notification component
            onClick={() => onNotificationClick(notification.id)} // Handle click event
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
