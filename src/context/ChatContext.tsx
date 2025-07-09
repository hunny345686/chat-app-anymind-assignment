import React, { createContext, useContext, useState, useEffect } from "react";
import type { ChannelName, ChatContextType, UserId } from "../types/types";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load from localStorage or fallback
  const getInitialUser = (): UserId => {
    return (localStorage.getItem("selectedUser") as UserId) || "Joyse";
  };

  const getInitialChannel = (): ChannelName => {
    return (
      (localStorage.getItem("selectedChannel") as ChannelName) || "LGTM Channel"
    );
  };

  const getInitialInput = (): string => {
    return localStorage.getItem("chatInput") || "";
  };

  const [selectedUser, setSelectedUser] = useState<UserId>(getInitialUser);
  const [selectedChannel, setSelectedChannel] =
    useState<ChannelName>(getInitialChannel);
  const [inputValue, setInputValue] = useState<string>(getInitialInput);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("selectedUser", selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    localStorage.setItem("selectedChannel", selectedChannel);
  }, [selectedChannel]);

  useEffect(() => {
    localStorage.setItem("chatInput", inputValue);
  }, [inputValue]);

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedChannel,
        setSelectedChannel,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
