import { useEffect } from 'react';

import { deleteNotification } from '../api/deleteNotification';
import type { Notification } from '../api/receiveNotification';
import { receiveNotification } from '../api/receiveNotification';

export function useMessagePolling(
  onMessage: (notification: Notification) => void,
) {
  useEffect(() => {
    let isActive = true;

    async function poll() {
      while (isActive) {
        try {
          const notification = await receiveNotification();

          if (!isActive) {
            return;
          }

          if (notification) {
            onMessage(notification);

            await deleteNotification(notification.receiptId);
          }
        } catch (error) {
          console.error("Receive notification error:", error);

          if (isActive) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      }
    }

    poll();

    return () => {
      isActive = false;
    };
  }, [onMessage]);
}
