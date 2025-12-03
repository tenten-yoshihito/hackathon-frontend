// src/hooks/useItemDetail.ts

import { useState, useEffect, useCallback } from "react";
import { getItemDetail, ItemDetail } from "lib/api/item_detail";

export const useItemDetail = (id?: string) => {
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    
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
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { item, loading, error, refetch: load };
};