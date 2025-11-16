// src/pages/LoginPage.tsx
import React from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { fireAuth } from "lib/firebaseConfig";

import PasswordLoginForm from "components/auth/PasswordLoginForm";
import GoogleLoginForm from "components/auth/GoogleLoginForm";

const LoginPage: React.FC = () => {
  // Eメール・パスワードログイン
  const handlePasswordLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      alert("ログイン成功: " + userCredential.user.email);
    } catch (err) {
      console.error("ログインエラー:", err);
      const message = err instanceof Error ? err.message : String(err);
      alert(message);
    }
  };

  // Googleログイン
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(fireAuth, provider);
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
      alert("ログアウトしました。");
    } catch (err) {
      console.error("ログアウトエラー:", err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <h2>ログイン</h2>

      <PasswordLoginForm onSubmit={handlePasswordLogin} />

      <hr />
      <div className="divider">または</div>

      <GoogleLoginForm onGoogleLogin={handleGoogleLogin} />


      <button onClick={handleSignOut}>ログアウト</button>
    </div>
  );
};

export default LoginPage;
