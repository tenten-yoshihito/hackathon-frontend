// src/hooks/useCurrentUserData.ts

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { fetchUser, User } from "lib/api/user";


//現在ログイン中のユーザーのデータベース情報を取得するカスタムフック
export const useCurrentUserData = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchUser(currentUser.uid);
        setUserData(data);
      } catch (err) {
        console.error("Failed to load user data:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  return { userData, loading };
};
