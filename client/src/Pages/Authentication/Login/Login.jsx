import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { backToTop } from '../../../utilities/utilities';
import LoginForm from '../LoginForm/LoginForm';
import AuthLayout from '../AuthLayout/AuthLayout';

const Login = () => {
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    if (!location.hash) {
        backToTop();
    }

    const onSuccess = () => history.push(redirectUrl);
    const onError = (error) => {
        setError(null);
        setError(error);
    };


    return (
        <AuthLayout user={user} error={error} onError={onError} onSuccess={onSuccess}>
            <LoginForm onError={onError} onSuccess={onSuccess} />
        </AuthLayout>
    );
};

export default Login;