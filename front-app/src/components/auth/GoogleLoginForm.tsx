//src/components/auth/GoogleLoginForm.tsx

import React from "react";

type Props = {
  onGoogleLogin: () => Promise<void>;
};

const GoogleLoginForm: React.FC<Props> = ({ onGoogleLogin }) => {
  return (
    <div className="login-form">
      <button onClick={onGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default GoogleLoginForm;
