import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { createUser, getUserByEmail } from '../../../api/usersAPI';
import useAuth from '../../../hooks/useAuth';
import { backToTop } from '../../../utilities/utilities';
import QuickAlert from '../../Shared/QuickAlert/QuickAlert';

const Login = () => {
    const { user, setUser, setIsLoading, signInUsingGoogle, logOut } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    // back-to-top
    if (!location.hash) {
        backToTop();
    }

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

            const res = await createUser(newUserData);
            if (res.data.status === 'fail') {
                logOut();
            }

            const data = await getUserByEmail(`/email/${newUserData.email}`);
            setUser(data.data.data);
            history.push(redirectUrl);
        }
    };

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then(handleSavingUser)
            .catch(error => console.warn(error.message))
            .finally(() => setIsLoading(false));
    }

    return (
        <Container className="text-center py-4" style={{ minHeight: '50vh' }}>
            {user && <QuickAlert variant="warning" heading="You're logged in already!" icon={<FontAwesomeIcon icon={faExclamationTriangle} />}>
                Please logout to login from another account.
            </QuickAlert>}
            <h5>Login with 3rd party</h5>
            <Button
                variant={user ? "secondary" : "outline-primary"}
                onClick={handleGoogleSignIn}
                disabled={user}
            >Sign in with Google</Button>
        </Container>
    );
};

export default Login;