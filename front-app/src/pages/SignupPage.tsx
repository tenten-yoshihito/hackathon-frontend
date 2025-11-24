// src/pages/SignUpPage.tsx

import React from 'react';
import { useSignup } from 'hooks/useSignup'; 
import SignupForm from 'components/auth/SignupForm';

const SignupPage: React.FC = () => {
     
    const { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        name,
        setName,
        onSubmit,
        isLoading 
    } = useSignup();

    return (
        <div className="signup-page-container">
            <SignupForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                name={name}
                setName={setName}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};

export default SignupPage;