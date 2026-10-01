import { greenApiFetch } from '@/shared/api/';
import { getCookie } from '@/shared/api/lib';

type SendMessageParams = {
  chatId: string;
  message: string;
};

type SendMessageResponse = {
  idMessage: string;
};

export async function sendMessage({
  chatId,
  message,
}: SendMessageParams): Promise<SendMessageResponse> {
  const idInstance = getCookie("idInstance");
  const apiTokenInstance = getCookie("apiTokenInstance");

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Credentials not found");
  }

  const response = await greenApiFetch(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Send message failed: ${response.status}`);
  }

  return response.json();
}
