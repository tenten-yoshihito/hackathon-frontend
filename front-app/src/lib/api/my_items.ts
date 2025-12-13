// src/lib/api/my_items.ts

import { getBaseUrl } from "./client";
import { getIdToken } from "../firebaseConfig";
import { ItemSimple } from "types/item";

export type { ItemSimple };

//自分が出品した商品一覧を取得
export const fetchMyItems = async (): Promise<ItemSimple[]> => {
  const token = await getIdToken();
  
  console.log("Fetching my items with token:", token ? "Token exists" : "No token");

  const response = await fetch(`${getBaseUrl()}/items/my`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error("Failed to fetch my items");
  }

  return response.json();
};
