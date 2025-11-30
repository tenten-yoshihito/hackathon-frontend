// src/lib/api/item_register.ts

import { getBaseUrl } from "./client";

interface CreateItemData {
  name: string;
  price: number;
  description: string;
  image_urls: string[];
}

export const createItemInBackend = async (
  token: string,
  data: CreateItemData
) => {
  const res = await fetch(`${getBaseUrl()}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("商品の出品に失敗しました");
  }

  return res.json();
};
