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

// 認証ロジック
export const useAuth = () => {
    // ユーザー状態
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Eメール・パスワードログイン
    const handlePasswordLogin = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(fireAuth, email, password);
            setCurrentUser(userCredential.user); // 状態を更新
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
            const res = await signInWithPopup(fireAuth, provider);
            setCurrentUser(res.user);
            alert("ログインユーザー: " + res.user.displayName);
        } catch (err) {
            console.error("Googleログインエラー:", err);
            const message = err instanceof Error ? err.message : String(err);
            alert(message);
            throw err;
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