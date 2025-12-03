// src/lib/api/item_list.ts

import { getBaseUrl } from "./client";

// Goの ItemSimple 構造体と合わせる
export interface ItemSimple {
  id: string;
  name: string;
  price: number;
  image_url: string;
  status: string;
}

export const getItemList = async (): Promise<ItemSimple[]> => {
  const res = await fetch(`${getBaseUrl()}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("商品一覧の取得に失敗しました");
  }

  const json = await res.json();
  return json.items;
};