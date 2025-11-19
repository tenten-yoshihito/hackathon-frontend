import { useState, FormEvent } from "react";
import { fireAuth } from 'lib/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const useSignup = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
            
            await sendEmailVerification(userCredential.user);
            
            alert('アカウント作成に成功しました！確認メールを送信しました。');
            // TODO: リダイレクト処理
            
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