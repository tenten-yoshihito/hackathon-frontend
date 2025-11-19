// src/pages/LoginPage.tsx 

import React from "react";
import PasswordLoginForm from "components/auth/PasswordLoginForm";
import GoogleLoginForm from "components/auth/GoogleLoginForm";
import SignOutButton from "components/auth/SignOutButton";
import { useAuth } from "hooks/useAuth"; 

const LoginPage: React.FC = () => {
  const { handlePasswordLogin, handleGoogleLogin, handleSignOut } = useAuth();
  return (
    <div className="login-page-wrapper">
      <h2>ログイン</h2>
      
      <PasswordLoginForm onSubmit={handlePasswordLogin} />

      <hr />

      <div className="divider">または</div>

      <GoogleLoginForm onGoogleLogin={handleGoogleLogin} />

      <SignOutButton onSignOut={handleSignOut} />

    </div>
  );
};

export default LoginPage;