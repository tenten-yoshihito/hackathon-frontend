// src/hooks/useItemDetail.ts

import { useState, useEffect } from "react";
import { getItemDetail, ItemDetail } from "lib/api/item_detail";

export const useItemDetail = (id?: string) => {
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getItemDetail(id);
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { item, loading, error };
};