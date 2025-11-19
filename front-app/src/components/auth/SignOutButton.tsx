//src/components/auth/LogOutbutton.tsx

import React from "react";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOutButton: React.FC<Props> = ({ onSignOut }) => {
  return (
    <div className="signout-button">
      <button onClick={onSignOut}>ログアウト</button>
    </div>
  );
};

export default SignOutButton;
