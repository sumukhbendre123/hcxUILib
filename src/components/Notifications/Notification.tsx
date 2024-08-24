// Notification.tsx
import React from "react";
import { NotificationProps } from "./Notification.types";

// Functional component for displaying individual notifications
const Notification: React.FC<NotificationProps> = ({
  header, // The header text of the notification
  text, // The main content or description of the notification
  date, // The date when the notification was created
  onClick, // Callback function to handle click events on the notification
}) => {
  return (
    <div
      className="p-4 border-b border-gray-300 dark:border-gray-700 cursor-pointer" // Style the notification container
      onClick={onClick} // Handle click events
    >
      {/* Header of the notification */}
      <h4 className="text-lg font-medium text-black dark:text-white">
        {header}
      </h4>
      {/* Main content of the notification */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</p>
      {/* Date of the notification */}
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{date}</p>
    </div>
  );
};

export default Notification;
