import { greenApiFetch } from '@/shared/api';
import { getCookie } from '@/shared/api/lib';

export async function deleteNotification(receiptId: number) {
  const idInstance = getCookie("idInstance");
  const apiTokenInstance = getCookie("apiTokenInstance");

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Credentials not found");
  }

  const response = await greenApiFetch(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete notification");
  }
}
