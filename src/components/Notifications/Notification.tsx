// Notification.tsx
import React from "react";
import { NotificationProps } from "./Notification.types";

const Notification: React.FC<NotificationProps> = ({
  header,
  text,
  date,
  onClick,
}) => {
  return (
    <div
      className="p-4 border-b border-gray-300 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <h4 className="text-lg font-medium text-black dark:text-white">
        {header}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{date}</p>
    </div>
  );
};

export default Notification;
