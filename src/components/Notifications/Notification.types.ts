export interface NotificationProps {
    id: number;
    header: string;
    text: string;
    sender_code: string;
    date: string;
    onClick: () => void;
  }
  
  
  export interface NotificationListProps {
    notifications: NotificationProps[];
    loading: boolean;
    onNotificationClick: (id: number) => void;
    activeNotificationId: number | null;
  }
  