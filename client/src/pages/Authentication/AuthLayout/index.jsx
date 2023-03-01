import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import QuickAlert from '../../Shared/QuickAlert';
import GoogleSignIn from '../GoogleSignIn';
import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';
import { backToTop } from '../../../utilities/utilities';

const AuthLayout = ({ children, error, onError }) => {
    const { user } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    if (!location.hash) {
        backToTop();
    }

    if (user) {
        setTimeout(() => {
            history.push(redirectUrl);
        });
    }

    return (
        <Container className="py-4">
            {user && <QuickAlert variant="warning" heading="You're logged in already!" icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                Please logout to login from another account.
            </QuickAlert>}
            {error && <QuickAlert variant="danger" heading={error.heading} icon={<FontAwesomeIcon icon={faExclamationCircle} />}>
                {error.message}
            </QuickAlert>}
            <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400 }}>
                {children}
                <div className="mt-4">
                    <GoogleSignIn
                        className="w-100"
                        onError={onError}
                    />
                </div>
            </div>
        </Container>
    );
};

export default AuthLayout;