import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import AuthLayout from '../AuthLayout';

const Login = () => {
    const [error, setError] = useState(null);

    const onError = (error) => {
        setError(null);
        setError(error);
    };

    return (
        <AuthLayout error={error} onError={onError} >
            <LoginForm onError={onError} />
        </AuthLayout>
    );
};

export default Login;