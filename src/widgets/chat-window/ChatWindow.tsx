import { useCallback } from 'react';

import type { Message } from '@/entities/message/model/types';
import type { Notification } from '@/features/receive-messages/api';
import {
  useMessagePolling,
} from '@/features/receive-messages/model/useMessagePolling';
import { MessageInput } from '@/features/send-message/ui/MessageInput';

type ChatWindowProps = {
  chatId: string | null;
  messages: Message[];
  // Принимает новый массив сообщений или функцию и обновляет состояние в родительском компоненте
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; 
  onIncomingChat: (chatId: string) => void;
};

export function ChatWindow({
  chatId,
  messages,
  setMessages,
  onIncomingChat,
}: ChatWindowProps) {
  const handleMessage = useCallback(
    (notification: Notification) => {
      const { body } = notification;

      if (
        body.typeWebhook !== "incomingMessageReceived" ||
        body.messageData?.typeMessage !== "textMessage"
      ) {
        return;
      }

      const text = body.messageData.textMessageData?.textMessage;
      const notificationChatId = body.senderData?.chatId;

      if (!text || !notificationChatId) {
        return;
      }

      onIncomingChat(notificationChatId);

      const message: Message = {
        id: body.idMessage,
        chatId: notificationChatId,
        text,
        direction: "incoming",
        timestamp: body.timestamp,
      };

      setMessages((prev) => {
        if (prev.some((item) => item.id === message.id)) {
          return prev;
        }

        return [...prev, message];
      });
    },
    [onIncomingChat, setMessages],
  );

  useMessagePolling(handleMessage);

  if (!chatId) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-background">
        <p className="text-text-secondary">Выберите чат</p>
      </section>
    );
  }

  const chatMessages = messages.filter((message) => message.chatId === chatId);

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="flex h-16 shrink-0 items-center border-b border-border bg-surface px-6">
        <div>
          <h2 className="font-semibold text-text-primary">{chatId}</h2>

          <p className="text-sm text-text-secondary">WhatsApp</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={
              message.direction === "outgoing"
                ? "self-end rounded-2xl bg-primary px-4 py-2 text-white"
                : "self-start rounded-2xl bg-surface px-4 py-2 text-text-primary"
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <MessageInput
        chatId={chatId}
        onMessageSent={(message) => {
          setMessages((prev) => [...prev, message]);
        }}
      />
    </section>
  );
}
