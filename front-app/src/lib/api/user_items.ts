// src/lib/api/user_items.ts

import { getBaseUrl } from "./client";
import { ItemSimple } from "types/item";

//指定ユーザーの出品商品一覧を取得（プロフィールページ用）
export const getUserItems = async (userId: string): Promise<ItemSimple[]> => {
  const res = await fetch(`${getBaseUrl()}/users/${userId}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user items");
  }

  return res.json();
};
