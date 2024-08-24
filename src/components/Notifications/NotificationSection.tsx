// NotificationSection.tsx
import React from "react";
import NotificationList from "./NotificationList";
import { NotificationProps } from "./Notification.types";

// Props interface for the NotificationSection component
interface NotificationSectionProps {
  notifications: NotificationProps[]; // Array of notifications to display
  loading: boolean; // Boolean indicating if notifications are loading
  onNotificationClick: (id: number) => void; // Callback function to handle click events on a notification
  activeNotificationId: number | null; // ID of the currently active notification or null if none
}

// NotificationSection component serves as a container for the NotificationList
const NotificationSection: React.FC<NotificationSectionProps> = ({
  notifications, // List of notifications to be passed to the NotificationList component
  loading, // Loading state to be passed to the NotificationList component
  onNotificationClick, // Function to handle notification click events, passed to NotificationList
  activeNotificationId, // ID of the currently active notification, passed to NotificationList
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Render NotificationList component with the provided props */}
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
