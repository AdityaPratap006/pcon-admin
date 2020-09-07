import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import { navigationRoutes } from './navigation/routes';
import { AuthContext } from './contexts/auth-context';
import MainNavigation from './navigation/MainNavigation';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  const { checkingAuthState, loggedIn, login, logout } = useAuth();

  if (checkingAuthState) {
    return <SplashScreen />;
  }

  let routes;
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path={navigationRoutes.HOME}>
          <HomeScreen />
        </Route>
        <Route exact path={navigationRoutes.USERS}>
          <h1>USER LIST</h1>
        </Route>
        <Route exact path={navigationRoutes.NOTIFICATIONS}>
          <h1>NOTIFICATIONS</h1>
        </Route>
        <Route exact path={navigationRoutes.INTERVIEW_EXPERIENCES}>
          <h1>INTERVIEW_EXPERIENCES</h1>
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
    <div className="App">
      <AuthContext.Provider
        value={{
          loggedIn,
          login,
          logout,
        }}
      >
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
