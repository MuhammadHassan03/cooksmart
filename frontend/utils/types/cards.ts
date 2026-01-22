export interface ActionCardProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  flex?: number;
  variant?: 'primary' | 'surface';
}

export interface ItemCardProps {
  name: string;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode; // Button, Checkbox, ya Expiry Tag ke liye
  isUrgent?: boolean; // Expiration highlighting ke liye
  onPress?: () => void;
  variant?: "default" | "ghost" | "flat";
  leftElement?: React.ReactNode;
}