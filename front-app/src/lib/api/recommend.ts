// src/lib/api/recommend.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";
import { ItemSimple } from "types/item";

// パーソナライズされたおすすめ商品を取得
export const getPersonalizedRecommendations = async (): Promise<ItemSimple[]> => {
  const token = await getIdToken();

  const response = await fetch(`${getBaseUrl()}/items/recommend`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch personalized recommendations");
  }

  const data = await response.json();
  return data.items || [];
};

// 指定された商品に似ている関連商品を取得（認証不要）
export const getSimilarItems = async (itemId: string): Promise<ItemSimple[]> => {
  const response = await fetch(`${getBaseUrl()}/items/${itemId}/recommend`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch similar items");
  }

  const data = await response.json();
  return data.items || [];
};
