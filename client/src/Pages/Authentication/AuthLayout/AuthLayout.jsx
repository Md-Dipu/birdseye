import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import QuickAlert from '../../Shared/QuickAlert/QuickAlert';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import useAuth from '../../../hooks/useAuth';

const AuthLayout = ({ children, error, onError, onSuccess }) => {
    const { user } = useAuth();

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
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                </div>
            </div>
        </Container>
    );
};

export default AuthLayout;