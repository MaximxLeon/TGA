import { useState } from 'react';

import { CreateChatForm } from '@/features/create-chat/ui/CreateChatForm';
import { Modal } from '@/shared/ui/Modal';

type ChatSidebarProps = {
  chats: string[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: (chatId: string) => void;
};

export function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onCreateChat,
}: ChatSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCreateChat(chatId: string) {
    onCreateChat(chatId);
    setIsModalOpen(false);
  }

  return (
    <>
      <aside className="flex w-80 shrink-0 flex-col border-r border-border bg-surface">
        <header className="flex h-16 items-center justify-between border-b border-border px-4">
          <h1 className="text-lg font-semibold">Чаты</h1>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-primary transition hover:bg-surface-hover"
          >
            +
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chatId) => (
            <button
              key={chatId}
              type="button"
              onClick={() => onSelectChat(chatId)}
              className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition ${
                activeChatId === chatId
                  ? "bg-surface-hover"
                  : "hover:bg-surface-hover"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                {chatId.charAt(0)}
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-text-primary">
                  {chatId.replace("@c.us", "")}
                </p>

                <p className="text-sm text-text-secondary">WhatsApp</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateChatForm onCreate={handleCreateChat} />
      </Modal>
    </>
  );
}
