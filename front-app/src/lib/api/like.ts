// src/lib/api/like.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";
import { ItemSimple } from "types/item";

//いいねをトグル（登録/解除）
export const toggleLike = async (itemId: string): Promise<void> => {
  const token = await getIdToken();

  const response = await fetch(`${getBaseUrl()}/items/${itemId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to toggle like");
  }
};

//自分がいいねした商品一覧を取得
export const getLikedItems = async (): Promise<ItemSimple[]> => {
  const token = await getIdToken();

  const response = await fetch(`${getBaseUrl()}/items/liked`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch liked items");
  }

  return response.json();
};

//自分がいいねした商品IDのリストを取得
export const getLikedItemIDs = async (): Promise<string[]> => {
  const token = await getIdToken();

  const response = await fetch(`${getBaseUrl()}/items/liked-ids`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch liked item IDs");
  }

  const data = await response.json();
  return data.liked_item_ids || [];
};
