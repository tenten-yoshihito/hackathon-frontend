//src/components/auth/PasswordLoginForm.tsx

import React, { FormEvent, useState } from "react";

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

const PasswordLoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
    // setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={onLoginSubmit}>
      <div className="form-group">
        <label className="form-label">メールアドレス</label>
        <input
          type="email"
          className="form-input"
          value={email}
          placeholder="email@example.com"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">パスワード</label>
        <input
          type="password"
          className="form-input"
          value={password}
          placeholder="パスワードを入力"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="primary-button w-full mt-24">
        ログイン
      </button>
    </form>
  );
};
export default PasswordLoginForm;
