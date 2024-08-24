// Notification.types.ts

// Interface for defining the properties of a single notification
export interface NotificationProps {
  id: number;           // Unique identifier for the notification
  header: string;       // Header or title of the notification
  text: string;         // Main content or description of the notification
  sender_code: string;  // Code or identifier for the sender of the notification
  date: string;         // Date when the notification was created
  onClick: () => void;  // Callback function to handle click events on the notification
}

// Interface for defining the properties of the notification list component
export interface NotificationListProps {
  notifications: NotificationProps[];  // Array of notifications to be displayed
  loading: boolean;                    // Boolean indicating if notifications are loading
  onNotificationClick: (id: number) => void;  // Callback function to handle notification click events
  activeNotificationId: number | null; // ID of the currently active or selected notification (null if none)
}
