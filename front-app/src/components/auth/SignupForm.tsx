import React, { FormEvent } from "react";
// import "./styles.css"; // 必要に応じてスタイルをインポート

// フックから受け取るPropsの型を定義
interface Props {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const SignupForm: React.FC<Props> = ({ 
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    isLoading
}) => {
    return (
        <form onSubmit={onSubmit} className="login-form">
            <h2>新規会員登録</h2>
            email:
            <div>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading} // ロード中は入力不可
                />
            </div>
            password:
            <div>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading} // ロード中は入力不可
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? '登録中...' : 'アカウント作成'}
            </button>
        </form>
    );
};

export default SignupForm;