import React, { useState } from 'react';
import RegistrationForm from '../RegistrationForm';
import AuthLayout from '../AuthLayout';

const Register = () => {
    const [error, setError] = useState(null);

    const onError = (error) => {
        setError(null);
        setError(error);
    };

    return (
        <AuthLayout error={error} onError={onError} >
            <RegistrationForm onError={onError} />
        </AuthLayout>
    );
};

export default Register;