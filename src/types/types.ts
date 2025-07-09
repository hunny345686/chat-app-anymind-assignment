export type UserId = "Joyse" | "Russell" | "Sam";
export type ChannelName =
  | "General Channel"
  | "Technology Channel"
  | "LGTM Channel";

export interface ChatContextType {
  selectedUser: UserId;
  setSelectedUser: (user: UserId) => void;

  selectedChannel: ChannelName;
  setSelectedChannel: (channel: ChannelName) => void;

  inputValue: string;
  setInputValue: (value: string) => void;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  type: "received" | "sent" | "error";
  avatar: string;
}
