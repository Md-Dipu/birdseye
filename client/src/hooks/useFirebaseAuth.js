import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, getIdToken } from "firebase/auth";
import { firebaseAppInitializer } from "../config/Firebase/firebase.init";
import { getUserByEmail } from '../api/usersAPI';

// initialize firebase for this App
firebaseAppInitializer();

const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    // Sign in using Google (sing up and login)
    const signInUsingGoogle = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();

        return signInWithPopup(auth, googleProvider);
    }

    // state change from firebase
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user).then(idToken => localStorage.setItem('idToken', idToken));
                getUserByEmail(user.email).then(res => {
                    setUser(res.data.data);
                    setIsLoading(false);
                }).catch(error => {
                    console.warn(error.message);
                    signOut(auth)
                        .then(() => { })
                        .finally(() => setIsLoading(false));
                });
            }
            else {
                setUser(null)
                setIsLoading(false);
            }
        });
        return () => unsubscribed;
    }, [auth])

    // Log out 
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    }

    return { user, isLoading, setUser, setIsLoading, signInUsingGoogle, logOut };
}

export default useFirebase;