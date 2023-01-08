import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { backToTop } from '../../../utilities/utilities';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import AuthLayout from '../AuthLayout/AuthLayout';

const Register = () => {
    const [error, setError] = useState(null);

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
        <AuthLayout error={error} onError={onError} onSuccess={onSuccess}>
            <RegistrationForm onError={onError} onSuccess={onSuccess} />
        </AuthLayout>
    );
};

export default Register;