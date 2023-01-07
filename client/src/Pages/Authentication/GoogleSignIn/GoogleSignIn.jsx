import React from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';

const GoogleSignIn = ({ handleSavingUser }) => {
    const { user, signInUsingGoogle, setIsLoading } = useAuth();

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then(handleSavingUser)
            .catch(error => console.warn(error.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <Button
            variant={user ? "secondary" : "outline-primary"}
            onClick={handleGoogleSignIn}
            disabled={user}
        >Sign in with Google</Button>
    );
};

export default GoogleSignIn;