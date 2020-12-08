import React, { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hjem from '../pages/HjemPage';
import Kontorer from '../pages/KontorerPage';
import KontorerForm from '../pages/KontorerFormPage';
import FagartikkelForm from '../pages/FagartikkelFormPage';
import Fagartikler from '../pages/FagartiklerPage';
import UserForm from '../pages/UserFormPage';
import LoginForm from '../pages/LoginFormPage';
import ArtikkelVisning from '../pages/ArtikkelVisningPage';

import { useAuthContext } from "../context/AuthProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';


const AuthenticatedRoutes = ({ children, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn && !isLoading ? (
          <div>{children}</div>
        ) : (
          <Redirect
            to={{
              pathname: '/loginForm',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};


const Routes = () => (
  <Router>
    <MainLayout>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route exact path="/">
            <Hjem />
          </Route>
          <Route exact path="/kontorer">
            <Kontorer />
          </Route>

          <Route path="/fagartikler">
            <Fagartikler />
          </Route>

          <Route exact path="/kontorerForm">
            <KontorerForm />
          </Route>
          <Route exact path ="/fagartikkelForm">
            <FagartikkelForm/>
          </Route>
          <Route exact path ="/artikkelVisning/:id">
            <ArtikkelVisning />
          </Route>
        <Route exact path = "/registrationForm">
          <UserForm/>
        </Route>
        <Route exact path = '/loginForm'>
          
          <LoginForm/>
          
        </Route>
        
        
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;