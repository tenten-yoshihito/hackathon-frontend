//src/components/auth/GoogleLoginForm.tsx

import React from "react";
import { GOOGLE_ICON } from "constants/images";

type Props = {
  onGoogleLogin: () => void;
};

const GoogleLoginForm: React.FC<Props> = ({ onGoogleLogin }) => {
  return (
    <button onClick={onGoogleLogin} className="secondary-button w-full" type="button">
      <img src={GOOGLE_ICON} alt="Google" width="20" height="20" />
      Googleでログイン
    </button>
  );
};

export default GoogleLoginForm;
