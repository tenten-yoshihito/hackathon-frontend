//src/components/auth/SignUpForm.tsx

import React, { FormEvent } from "react";

interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  isLoading: boolean;
}

const SignupForm: React.FC<Props> = ({
  email, setEmail,
  password, setPassword,
  name, setName,
  onSubmit, isLoading,
}) => {
  return (
    
    <form onSubmit={onSubmit}>
      <h2 className="page-title">新規会員登録</h2>
      
      <div className="form-group">
        <label className="form-label" htmlFor="signup-name">ニックネーム</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          className="form-input"
          autoComplete="name"
          value={name}
          placeholder="例: 山田 太郎"
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="signup-email">メールアドレス</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          className="form-input"
          autoComplete="email"
          value={email}
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="signup-password">パスワード</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          className="form-input"
          autoComplete="new-password"
          value={password}
          placeholder="パスワードを入力"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <button type="submit" disabled={isLoading} className="primary-button w-full mt-24">
        {isLoading ? "登録中..." : "アカウント作成"}
      </button>
    </form>
  );
};

export default SignupForm;