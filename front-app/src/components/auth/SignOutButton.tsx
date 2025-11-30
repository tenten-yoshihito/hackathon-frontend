// src/components/auth/SignOutButton.tsx

import React from "react";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOutButton: React.FC<Props> = ({ onSignOut }) => {
  return (
    <div className="center-text">
      <button onClick={onSignOut} className="text-button">
        ログアウト
      </button>
    </div>
  );
};

export default SignOutButton;
