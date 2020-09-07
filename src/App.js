import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { navigationRoutes } from './navigation/routes';
import MainNavigation from './navigation/MainNavigation';

function App() {

  let routes;
  routes = (
    <Switch>
      <Route exact path={navigationRoutes.HOME}>
        <h1>HOME</h1>
      </Route>
      <Route exact path={navigationRoutes.AUTH}>
        <h1>AUTH</h1>
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

  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </div>
  );
}

export default App;
