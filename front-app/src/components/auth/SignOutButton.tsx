//src/components/auth/SignOutButton.tsx

import React from "react";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOutButton: React.FC<Props> = ({ onSignOut }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={onSignOut} className="text-button">
        ログアウト
      </button>
    </div>
  );
};

export default SignOutButton;
