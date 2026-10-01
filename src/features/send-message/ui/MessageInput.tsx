import { useState } from 'react';

import type { Message } from '@/entities/message/model/types';

import { useSendMessage } from '../model/useSendMessage';

type MessageInputProps = {
  chatId: string;
  onMessageSent: (message: Message) => void;
};

export function MessageInput({ chatId, onMessageSent }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const { handleSend, isLoading, error } = useSendMessage({ chatId });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = message.trim();

    if (!text) {
      return;
    }

    const result = await handleSend(text);

    if (!result) {
      return;
    }

    onMessageSent({
      id: result.idMessage,
      chatId,
      text,
      direction: "outgoing",
      timestamp: Math.floor(Date.now() / 1000),
    });

    setMessage("");
  }

  return (
    <div className="border-t border-border bg-surface p-4">
      {error && <p className="mb-2 text-sm text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "..." : "Отправить"}
        </button>
      </form>
    </div>
  );
}
