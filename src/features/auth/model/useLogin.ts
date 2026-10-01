import { useState } from 'react';

import { setCookie } from '@/shared/api/lib';

import { validateCredentials } from '../api';

type UseLoginProps = {
  onLogin: () => void;
};

export function useLogin({ onLogin }: UseLoginProps) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const isValid = await validateCredentials({
        idInstance,
        apiTokenInstance,
      });

      if (!isValid) {
        setError(
          "WhatsApp не подключён. Авторизуйте инстанс через QR-код в GREEN-API.",
        );
        return;
      }

      setCookie("idInstance", idInstance);
      setCookie("apiTokenInstance", apiTokenInstance);

      onLogin();
    } catch {
      setError("Не удалось подключиться к GREEN-API");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    idInstance,
    apiTokenInstance,
    error,
    isLoading,
    setIdInstance,
    setApiTokenInstance,
    handleSubmit,
  };
}
