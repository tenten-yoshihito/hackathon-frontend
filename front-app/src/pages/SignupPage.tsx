// src/pages/SignUpPage.tsx

import React from "react";
import { useSignup } from "hooks/useSignup";
import SignupForm from "components/auth/SignupForm";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  const signupProps = useSignup();

  return (
    <div className="container-sm">
      {/* フォーム本体 */}
      <SignupForm {...signupProps} />

      {/* ログインへのリンク */}
      <div className="center-box">
        <p className="helper-text">
          すでにアカウントをお持ちの方は
          <br />
          <Link to="/login" className="text-link">
            ログインはこちら
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
