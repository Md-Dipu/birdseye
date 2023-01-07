import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const GoogleSignIn = ({ handleSavingUser, onError, ...rest }) => {
    const { user, signInUsingGoogle, setIsLoading } = useAuth();

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then(handleSavingUser)
            .catch(error => onError({
                heading: 'Failed to login',
                message: error.message
            }))
            .finally(() => setIsLoading(false));
    };

    return (
        <Button {...rest}
            variant={user ? "secondary" : "outline-secondary"}
            onClick={handleGoogleSignIn}
            disabled={user}
        >Sign in with Google</Button>
    );
};

export default GoogleSignIn;