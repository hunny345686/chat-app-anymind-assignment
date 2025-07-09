import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  FETCH_LATEST_MESSAGES,
  FETCH_MORE_MESSAGES,
  POST_MESSAGE,
} from "../graphql/messages";
import { useChat } from "../context/ChatContext";
import { useEffect, useState } from "react";
import { CHANNEL_MAP } from "../utils/channelMap";
import type { ChatMessage } from "../types/types";

export const useMessages = () => {
  const { selectedUser, selectedChannel, inputValue, setInputValue } =
    useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data, loading, error, refetch } = useQuery(FETCH_LATEST_MESSAGES, {
    variables: { channelId: CHANNEL_MAP[selectedChannel] },
    fetchPolicy: "network-only",
  });

  const [postMessageMutation] = useMutation(POST_MESSAGE);
  const [fetchMoreMessages] = useLazyQuery(FETCH_MORE_MESSAGES);

  useEffect(() => {
    if (data?.fetchLatestMessages) {
      const mapped = data.fetchLatestMessages.map((msg: any, i: number) => ({
        id: `${msg.userId}-${msg.timestamp}-${i}`,
        user: msg.userId,
        avatar: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${msg.userId}.png`,
        message: msg.text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: msg.userId === selectedUser ? "sent" : "received",
      }));
      setMessages(mapped.reverse());
    }
  }, [data, selectedUser]);

  console.log(messages);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      user: selectedUser,
      avatar: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${selectedUser}.png`,
      message: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    try {
      const { data } = await postMessageMutation({
        variables: {
          channelId: CHANNEL_MAP[selectedChannel],
          text: inputValue,
          userId: selectedUser,
        },
      });

      const posted = data?.postMessage;
      if (posted) {
        const newMessage: ChatMessage = {
          id: `${posted.userId}-${posted.timestamp}`,
          user: posted.userId,
          avatar: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${posted.userId}.png`,
          message: posted.text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "sent",
        };
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? newMessage : msg))
        );
      }
    } catch (err) {
      console.error("Post message failed:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, type: "error" as const } : msg
        )
      );
    }
  };
  const loadOlderMessages = async () => {
    if (messages.length === 0) return;

    const oldest = messages[0];
    const messageId = oldest.time;

    try {
      const { data } = await fetchMoreMessages({
        variables: {
          channelId: CHANNEL_MAP[selectedChannel],
          messageId: messageId,
          old: true,
        },
      });

      const moreMessages = data?.fetchMoreMessages || [];

      const mapped = moreMessages.map((msg: any, i: number) => ({
        id: `${msg.userId}-${msg.timestamp}-${i}`,
        user: msg.userId,
        avatar: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${msg.userId}.png`,
        message: msg.text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: msg.userId === selectedUser ? "sent" : "received",
      }));

      setMessages((prev) => [...mapped, ...prev]);
    } catch (err) {
      console.error("Failed to fetch older messages:", err);
    }
  };
  const retryMessage = async (failedMessage: ChatMessage) => {
    const tempId = failedMessage.id;

    try {
      const { data } = await postMessageMutation({
        variables: {
          channelId: CHANNEL_MAP[selectedChannel],
          text: failedMessage.message,
          userId: failedMessage.user,
        },
      });

      const posted = data?.postMessage;
      if (posted) {
        const newMessage: ChatMessage = {
          id: `${posted.userId}-${posted.timestamp}`,
          user: posted.userId,
          avatar: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${posted.userId}.png`,
          message: posted.text,
          time: new Date(posted.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "sent",
        };

        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? newMessage : msg))
        );
      }
    } catch (err) {
      console.error("Retry failed:", err);
    }
  };

  return {
    messages,
    loading,
    error,
    refetch,
    sendMessage,
    loadOlderMessages,
    retryMessage,
  };
};
