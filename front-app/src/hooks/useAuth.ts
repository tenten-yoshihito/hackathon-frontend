// src/hooks/useAuth.ts

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { fireAuth } from "lib/firebaseConfig";
import { registerUserToBackend } from "lib/api/user_register";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Eメール・パスワードログイン
  const handlePasswordLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      alert("ログイン成功: " + userCredential.user.email);
    } catch (err) {
      console.error("ログインエラー:", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(message);
      throw err;
    }
  };

  // Googleログイン
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Firebase認証
      const res = await signInWithPopup(fireAuth, provider);
      const user = res.user;

      // バックエンド同期
      try {
        const idToken = await user.getIdToken();

        await registerUserToBackend(
          idToken,
          user.displayName || "",
          user.email || "",
          user.photoURL || ""
        );
      } catch (apiError) {
        // 既に登録済みの場合などでエラーになっても、ログイン自体は成功させる(余裕があれば修正)
        console.warn("バックエンド同期スキップ(または登録済):", apiError);
      }

      setCurrentUser(res.user);
      alert("ログインユーザー: " + res.user.displayName);
    } catch (err) {
      console.error("Googleログインエラー:", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(message);
    }
  };

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(fireAuth);
      setCurrentUser(null);
      alert("ログアウトしました。");
    } catch (err) {
      console.error("ログアウトエラー:", err);
    }
  };

  return {
    currentUser,
    handlePasswordLogin,
    handleGoogleLogin,
    handleSignOut,
  };
};
