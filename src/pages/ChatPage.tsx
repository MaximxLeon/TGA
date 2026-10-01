import { useState } from 'react';

import type { Message } from '@/entities/message/model/types';
import { ChatSidebar } from '@/widgets/chat-sidebar';
import { ChatWindow } from '@/widgets/chat-window';

export function ChatPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<string[]>([]);

  // Улучшить можно localStorage либо БД
  const [messages, setMessages] = useState<Message[]>([]);

  function handleCreateChat(chatId: string) {
    setChats((prev) => {
      if (prev.includes(chatId)) {
        return prev;
      }

      return [...prev, chatId];
    });

    setActiveChatId(chatId);
  }

  function handleIncomingChat(chatId: string) {
    setChats((prev) => {
      if (prev.includes(chatId)) {
        return prev;
      }

      return [...prev, chatId];
    });

    setActiveChatId(chatId);
  }

  return (
    <main className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onCreateChat={handleCreateChat}
      />

      <ChatWindow
        chatId={activeChatId}
        messages={messages}
        setMessages={setMessages}
        onIncomingChat={handleIncomingChat}
      />
    </main>
  );
}
