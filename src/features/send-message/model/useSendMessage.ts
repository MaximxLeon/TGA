import { useState } from 'react';

import { sendMessage } from '../api/sendMessage';

type UseSendMessageProps = {
  chatId: string;
};

export function useSendMessage({ chatId }: UseSendMessageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(message: string) {
    if (!message.trim()) {
      return null;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await sendMessage({
        chatId,
        message,
      });

      return result;
    } catch {
      setError("Не удалось отправить сообщение");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    handleSend,
    isLoading,
    error,
  };
}
