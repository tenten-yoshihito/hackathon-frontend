// src/lib/api/description.ts

import { getIdToken } from "../firebaseConfig";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const generateDescription = async (imageURL: string): Promise<string> => {
  const token = await getIdToken();
  
  const response = await fetch(`${API_BASE_URL}/items/generate-description`, {
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
