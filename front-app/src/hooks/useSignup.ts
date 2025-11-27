// src/hooks/useSignup.ts

import { useState, FormEvent } from "react";
import { fireAuth } from "lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { registerUserToBackend } from "lib/api";

export const useSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firebaseでユーザー作成
      const userCredential = await createUserWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      const user = userCredential.user;

      try {
        const idToken = await user.getIdToken();

        // Goサーバーへ登録
        await registerUserToBackend(idToken, name, email);

        // 成功したらメール送信
        await sendEmailVerification(user);
        alert("アカウント作成に成功しました！確認メールを送信しました。");
      } catch (apiError) {
        // 失敗時のロールバック
        console.error("DB登録失敗。ロールバックします。", apiError);
        await deleteUser(user);
        throw apiError;
      }
    } catch (err) {
      console.error("サインアップエラー:", err);
      const message = err instanceof FirebaseError ? err.message : String(err);
      alert(`登録できませんでした: ${message}`);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    onSubmit,
    isLoading,
  };
};
