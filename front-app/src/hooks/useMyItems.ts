// src/hooks/useMyItems.ts

import { useState, useEffect } from "react";
import { fetchMyItems, ItemSimple } from "lib/api/my_items";
import { fireAuth } from "lib/firebaseConfig";

export const useMyItems = () => {
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMyItems = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const user = fireAuth.currentUser;
        if (!user) {
          setItems([]);
          setLoading(false);
          return;
        }

        const data = await fetchMyItems();
        setItems(data);
      } catch (err: any) {
        console.error("Failed to fetch my items:", err);
        setError(err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    // Wait for auth state to be ready
    const unsubscribe = fireAuth.onAuthStateChanged((user) => {
      if (user) {
        loadMyItems();
      } else {
        setItems([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { items, loading, error };
};
