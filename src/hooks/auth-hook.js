import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [checkingAuthState, setCheckingAuthState] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [expirationDate, setExpirationDate] = useState();

    const login = useCallback((expiration = null) => {
        setLoggedIn(true);

        const tokenExpirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 30 * 6);
        setExpirationDate(tokenExpirationDate);

        localStorage.setItem('userData', JSON.stringify({
            expirationDate: tokenExpirationDate.toISOString(),
        }));
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
        setExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (expirationDate) {
            const remainingTime = expirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [expirationDate, logout]);

    useEffect(() => {
        const localUserData = localStorage.getItem('userData');
        if (localUserData) {
            const userData = JSON.parse(localUserData);
            if (new Date(userData.expirationDate) > new Date()) {
                login(new Date(userData.expirationDate));
            }
        }

        setCheckingAuthState(false);
    }, [login]);

    return { checkingAuthState, loggedIn, login, logout };
};