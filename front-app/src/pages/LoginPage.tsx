// src/pages/LoginPage.tsx

import React from "react";
import PasswordLoginForm from "components/auth/PasswordLoginForm";
import GoogleLoginForm from "components/auth/GoogleLoginForm";
import SignOutButton from "components/auth/SignOutButton";
import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { handlePasswordLogin, handleGoogleLogin, handleSignOut, currentUser } =
    useAuth();

  return (
    <div className="container-sm">
      <h2 className="page-title">ログイン</h2>
      <PasswordLoginForm onSubmit={handlePasswordLogin} />

      <div className="divider-container">
        <div className="divider-line"></div>
        <span className="divider-text">または</span>
        <div className="divider-line"></div>
      </div>

      <GoogleLoginForm onGoogleLogin={handleGoogleLogin} />

      <div className="center-text">
        アカウントをお持ちでない方は
        <br />
        <Link to="/signup" className="text-link">
          新規会員登録はこちら
        </Link>
      </div>

      {currentUser && <SignOutButton onSignOut={handleSignOut} />}
    </div>
  );
};

export default LoginPage;
