// src/components/auth/AuthGuard.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "lib/firebaseConfig";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebaseの認証状態を監視
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      if (!user) {
        // ユーザーがいない（未ログイン）なら、ログイン画面へ飛ばす
        navigate("/login", { replace: true });
      }
      setLoading(false);
    });

    return () => unsubscribe(); // クリーンアップ
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        読み込み中...
      </div>
    );
  }
  // ログイン済みなら出品画面,DMなどを表示
  return <>{children}</>;
};
