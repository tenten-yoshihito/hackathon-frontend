//src/components/auth/GoogleLoginForm.tsx

import React from "react";

type Props = {
  onGoogleLogin: () => Promise<void>;
};

const GoogleLoginForm: React.FC<Props> = ({ onGoogleLogin }) => {
  return (
    <button onClick={onGoogleLogin} className="secondary-button" type="button">
      Googleでログイン
    </button>
  );
};

export default GoogleLoginForm;
