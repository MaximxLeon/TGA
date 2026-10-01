import { useState } from 'react';

type CreateChatFormProps = {
  onCreate: (chatId: string) => void;
};

export function CreateChatForm({ onCreate }: CreateChatFormProps) {
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedPhone = phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      return;
    }

    const chatId = `${normalizedPhone}`;

    onCreate(chatId);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Новый чат</h2>

        <p className="mt-1 text-sm text-text-secondary">
          Введите номер телефона получателя
        </p>
      </div>

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+79991234567"
        className="rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light"
        autoFocus
        required
      />

      <button
        type="submit"
        className="rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-hover"
      >
        Создать чат
      </button>
    </form>
  );
}
