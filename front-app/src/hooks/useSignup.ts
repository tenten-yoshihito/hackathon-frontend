// src/hooks/useSignup.ts

import { useState, FormEvent } from "react";
import { fireAuth } from "lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const useSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // ロード開始

    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireAuth,
        email,
        password
      );
      const user = userCredential.user;
      //idTokenの取得
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("http://127.0.0.1:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            // ※今はフォームがないので仮のデータを送ります
            // 後で <input> を増やして state から取得するようにしましょう
            name: "新規ユーザー",
            age: 15,
          }),
        });

        if (!res.ok) {
          throw new Error("サーバーへの登録に失敗しました");
        }
        // メール認証の送信
        await sendEmailVerification(userCredential.user);

        alert("アカウント作成に成功しました！確認メールを送信しました。");
      } catch (apiError) {
        console.error("DB登録失敗。ロールバックします。", apiError);
        // サーバー登録やメール送信に失敗した場合、作成したユーザーを削除
        await deleteUser(userCredential.user);
        throw apiError; // 外側のcatchへ
      }
    } catch (err) {
      // エラーハンドリングはここに残す
      console.error("サインアップエラー:", err);
      const message = err instanceof FirebaseError ? err.message : String(err);
      alert(`アカウント作成に失敗しました: ${message}`);
    } finally {
      setIsLoading(false); // ロード終了
      setEmail("");
      setPassword("");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    isLoading,
  };
};
