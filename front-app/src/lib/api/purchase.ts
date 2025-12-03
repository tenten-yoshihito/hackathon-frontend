// src/lib/api/purchase.ts

import { getIdToken } from "../firebaseConfig";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const purchaseItem = async (itemId: string): Promise<void> => {
  const token = await getIdToken();
  
  const response = await fetch(`${API_BASE_URL}/items/${itemId}/purchase`, {
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
