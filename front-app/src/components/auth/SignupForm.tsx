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
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="login-form">
      <h2>新規会員登録</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          autoComplete="name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "登録中..." : "アカウント作成"}
      </button>
    </form>
  );
};

export default SignupForm;
