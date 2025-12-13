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

  const json = await res.json();
  return json.items;
};