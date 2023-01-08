import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { backToTop } from '../../../utilities/utilities';
import QuickAlert from '../../Shared/QuickAlert/QuickAlert';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {
    const [error, setError] = useState(null);

    const { user, handleSavingUser } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    if (!location.hash) {
        backToTop();
    }

    const onError = (error) => {
        setError(null);
        setError(error);
    };

    return (
        <Container className="py-4">
            {user && <QuickAlert variant="warning" heading="You're logged in already!" icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                Please logout to login from another account.
            </QuickAlert>}
            {error && <QuickAlert variant="danger" heading={error.heading} icon={<FontAwesomeIcon icon={faExclamationCircle} />}>
                {error.message}
            </QuickAlert>}
            <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400 }}>
                <LoginForm onError={onError} />
                <div className="mt-4">
                    <GoogleSignIn
                        className="w-100"
                        handleSavingUser={result => handleSavingUser(result,
                            () => history.push(redirectUrl),
                            onError)}
                        onError={onError}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Login;