import { useState, useEffect } from 'react';
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
    getIdToken,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    deleteUser
} from "firebase/auth";
import { firebaseAppInitializer } from "../config/Firebase/firebase.init";
import { getUserByEmail } from '../api/usersAPI';

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
    };

    // Sign up using email and password
    const signUpUsingEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserOnFirebase = (data) => {
        return updateProfile(auth.currentUser, data);
    };

    // log in using email and password
    const logInUsingEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // delete current user
    const deleteCurrentUser = () => {
        return deleteUser(auth.currentUser);
    };

    // state change from firebase
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user).then(idToken => localStorage.setItem('idToken', idToken));
                getUserByEmail(`/email/${user.email}`).then(res => {
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
                localStorage.removeItem('idToken');
            }
        });
        return () => unsubscribed;
    }, [auth]);

    // Log out 
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {/* log out successfully */ })
            .finally(() => setIsLoading(false));
    };

    return {
        user,
        setUser,
        isLoading,
        setIsLoading,
        signInUsingGoogle,
        signUpUsingEmailAndPassword,
        updateUserOnFirebase,
        logInUsingEmailAndPassword,
        deleteCurrentUser,
        logOut
    };
}

export default useFirebase;