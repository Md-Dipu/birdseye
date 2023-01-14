import React from 'react';
import { Button } from 'react-bootstrap';
import { createUser, getUserByEmail } from '../../../api/usersAPI';
import useAuth from '../../../hooks/useAuth';

const GoogleSignIn = ({ onError, ...rest }) => {
    const { user, setUser, signInUsingGoogle, setIsLoading, logOut } = useAuth();

    const handleSavingUser = async (result) => {
        try {
            const data = await getUserByEmail(`/email/${result.user.email}`);
            setUser(data.data.data);

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
                    throw new Error(res.data.message);
                }

                const data = await getUserByEmail(`/email/${newUserData.email}`);
                setUser(data.data.data);

            } catch (error) {
                onError({
                    heading: 'Failed to login',
                    message: error.message
                });

                logOut();
            }
        }
    };

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