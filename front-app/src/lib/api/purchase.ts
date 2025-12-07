// src/lib/api/purchase.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export const purchaseItem = async (itemId: string): Promise<void> => {
  const token = await getIdToken();
  
  const response = await fetch(`${getBaseUrl()}/items/${itemId}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "購入に失敗しました");
  }

  return response.json();
};
