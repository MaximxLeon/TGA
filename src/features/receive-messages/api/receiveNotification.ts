import { greenApiFetch } from '@/shared/api/';
import { getCookie } from '@/shared/api/lib';

export type Notification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    timestamp: number;
    idMessage: string;
    senderData?: {
      chatId: string;
      chatName?: string;
      sender?: string;
      senderName?: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
};

export async function receiveNotification(): Promise<Notification | null> {
  const idInstance = getCookie('idInstance')
  const apiTokenInstance = getCookie('apiTokenInstance')

  if (!idInstance || !apiTokenInstance) {
    throw new Error('Credentials not found')
  }

  const response = await greenApiFetch(
    `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
  )

  const text = await response.text()

  if (!response.ok) {
    throw new Error(`Receive notification failed: ${response.status}`)
  }

  if (!text) {
    return null
  }

  return JSON.parse(text)
}