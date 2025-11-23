// src/pages/LoginPage.tsx

import React from "react";
import PasswordLoginForm from "components/auth/PasswordLoginForm";
import GoogleLoginForm from "components/auth/GoogleLoginForm";
import SignOutButton from "components/auth/SignOutButton";
import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { handlePasswordLogin, handleGoogleLogin, handleSignOut } = useAuth();
  return (
    <div className="login-page-wrapper">
      <h2>ログイン</h2>

      <PasswordLoginForm onSubmit={handlePasswordLogin} />

      <hr />

      <div className="divider">または</div>

      <GoogleLoginForm onGoogleLogin={handleGoogleLogin} />

      <Link to="/signup">新規登録はこちら</Link>

      <SignOutButton onSignOut={handleSignOut} />
    </div>
  );
};

export default LoginPage;
