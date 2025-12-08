//src/components/auth/GoogleLoginForm.tsx

import React from "react";

type Props = {
  onGoogleLogin: () => void;
};

const GoogleLoginForm: React.FC<Props> = ({ onGoogleLogin }) => {
  return (
    <button onClick={onGoogleLogin} className="secondary-button w-full" type="button">
      <img src="/google-icon.svg" alt="Google" width="20" height="20" />
      Googleでログイン
    </button>
  );
};

export default GoogleLoginForm;
