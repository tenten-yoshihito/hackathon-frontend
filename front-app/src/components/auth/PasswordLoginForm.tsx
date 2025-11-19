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
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-form">
      <form onSubmit={onLoginSubmit}>
        email:
        <div>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        password:
        <div>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default PasswordLoginForm;
