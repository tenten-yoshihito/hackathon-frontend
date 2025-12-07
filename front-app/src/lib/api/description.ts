// src/lib/api/description.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export const generateDescription = async (imageURL: string): Promise<string> => {
  const token = await getIdToken();
  
  const response = await fetch(`${getBaseUrl()}/items/generate-description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image_url: imageURL }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "説明の生成に失敗しました");
  }

  const data = await response.json();
  return data.description;
};
