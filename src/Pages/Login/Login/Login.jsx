import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { user, setUser, setIsLoading, signInUsingGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const redircet_url = location.state?.from || '/#home';

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then(result => {
                setUser(result.user);
                navigate(redircet_url);
            })
            .catch(error => console.warn(error))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Container className="text-center py-4" style={{ minHeight: '50vh' }}>
            {user && <Alert variant="success">
                <h6>Signed in as {user.displayName}</h6>
            </Alert>}
            <h5>Login with 3rd party</h5>
            <Button variant="outline-primary" onClick={handleGoogleSignIn}>Sign in with Google</Button>
        </Container>
    );
};

export default Login;