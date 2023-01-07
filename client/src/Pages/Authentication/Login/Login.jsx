import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { createUser, getUserByEmail } from '../../../api/usersAPI';
import useAuth from '../../../hooks/useAuth';
import { backToTop } from '../../../utilities/utilities';
import QuickAlert from '../../Shared/QuickAlert/QuickAlert';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';

const Login = () => {
    const [error, setError] = useState(null);

    const { user, setUser, logOut } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    // back-to-top
    if (!location.hash) {
        backToTop();
    }

    const onError = (error) => {
        setError(null);
        setError(error);
    };

    const handleSavingUser = async (result) => {
        try {
            const data = await getUserByEmail(`/email/${result.user.email}`);
            setUser(data.data.data);
            history.push(redirectUrl);

        } catch (error) {
            const newUserData = {};
            newUserData.name = result.user.displayName;
            newUserData.email = result.user.email;
            if (result.user.photoURL) {
                newUserData.imageURL = result.user.photoURL;
            }

            try {
                const res = await createUser(newUserData);
                if (res.data.status === 'fail') {
                    throw new Error('Unable to create user');
                }

                const data = await getUserByEmail(`/email/${newUserData.email}`);
                setUser(data.data.data);
                history.push(redirectUrl);

            } catch (error) {
                onError({
                    heading: 'Failed to login',
                    message: error.message
                });

                logOut();
            }
        }
    };

    return (
        <Container className="text-center py-4" style={{ minHeight: '50vh' }}>
            {user && <QuickAlert variant="warning" heading="You're logged in already!" icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                Please logout to login from another account.
            </QuickAlert>}
            {error && <QuickAlert variant="danger" heading={error.heading} icon={<FontAwesomeIcon icon={faExclamationCircle} />}>
                {error.message}
            </QuickAlert>}
            <GoogleSignIn handleSavingUser={handleSavingUser} onError={onError} />
        </Container>
    );
};

export default Login;