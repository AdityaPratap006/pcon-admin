import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import { useAuth } from './hooks/auth-hook';
import { navigationRoutes } from './navigation/routes';
import { AuthContext } from './contexts/auth-context';
import MainNavigation from './navigation/MainNavigation';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import UsersScreen from './screens/UsersScreen';
import InterviewsScreen from './screens/InterviewsScreen';
import InterviewDetailScreen from './screens/InterviewDetailScreen';
import { firebaseAuth } from './firebase/firebase.utils';
import ErrorModal from './components/ErrorModal';

const adminEmailList = [
  process.env.REACT_APP_ADMIN_1,
  process.env.REACT_APP_ADMIN_2,
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuthState, setCheckingAuthState] = useState(true);
  const [error, setError] = useState('');

  const logout = () => {
    firebaseAuth.signOut();
  }

  const clearErrorHandler = () => {
    setError('');
  }


  useEffect(() => {
    const unsubscribeAuth = firebaseAuth.onAuthStateChanged(async userData => {
      if (userData) {
        if (adminEmailList.includes(userData.email)) {
          setCurrentUser({
            email: userData.email,
            name: userData.displayName,
            photoURL: userData.photoURL,
            id: userData.uid,
          });
        } else {
          setError('Sorry! You are not authorized!!');
          setCurrentUser(null);
          logout();
        }
      } else {
        setCurrentUser(null);
      }

      setCheckingAuthState(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  if (checkingAuthState) {
    return <SplashScreen />;
  }

  let routes;
  if (currentUser) {
    routes = (
      <Switch>
        <Route exact path={navigationRoutes.HOME}>
          <HomeScreen />
        </Route>
        <Route exact path={navigationRoutes.USERS}>
          <UsersScreen />
        </Route>
        <Route exact path={navigationRoutes.NOTIFICATIONS}>
          <h1>NOTIFICATIONS</h1>
        </Route>
        <Route exact path={navigationRoutes.INTERVIEW_EXPERIENCES}>
          <InterviewsScreen />
        </Route>
        <Route exact path={`${navigationRoutes.INTERVIEW_EXPERIENCES}/:interviewId`}>
          <InterviewDetailScreen />
        </Route>
        <Redirect to={navigationRoutes.HOME} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path={navigationRoutes.AUTH}>
          <AuthScreen />
        </Route>
        <Redirect to={navigationRoutes.AUTH} />
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={clearErrorHandler}
      />
      <div className="App">
        <AuthContext.Provider value={{ user: currentUser, logout: logout }}>
          <Router>
            <MainNavigation />
            <main>
              {routes}
            </main>
          </Router>
        </AuthContext.Provider>
      </div>
    </React.Fragment>
  );
}

export default App;
