// src/lib/api/item_list.ts

import { getBaseUrl } from "./client";
import { ItemSimple } from "types/item";

export type { ItemSimple };

//商品一覧を取得
export const fetchItems = async (): Promise<ItemSimple[]> => {
  const res = await fetch(`${getBaseUrl()}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("商品一覧の取得に失敗しました");
  }

  const data = await res.json();
  return data.items || [];
};

//キーワードで商品を検索
export const searchItems = async (keyword: string): Promise<ItemSimple[]> => {
  const res = await fetch(`${getBaseUrl()}/items?name=${encodeURIComponent(keyword)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to search items");
  }

  const data = await res.json();
  return data.items || [];
};