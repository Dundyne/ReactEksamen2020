/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Hjem from '../pages/HjemPage';
import Kontorer from '../pages/KontorerPage';
import KontorerForm from '../pages/KontorerFormPage';
import FagartikkelForm from '../pages/FagartikkelFormPage';
import KontaktSide from '../pages/KontaktPage';
import Fagartikler from '../pages/FagartiklerPage';
import UserForm from '../pages/UserFormPage';
import LoginForm from '../pages/LoginFormPage';
import ArtikkelVisning from '../pages/ArtikkelVisningPage';
import KontorVisning from '../pages/KontorVisningPage';
import Aggregering from '../pages/AggregeringPage';
import FagartikkelRedigering from '../pages/FagartikkelRedigeringPage';

import { useAuthContext } from '../context/AuthProvider';

const AdminRoutes = ({ children, ...rest }) => {
  const { isLoggedIn, isAdmin, isLoading } = useAuthContext();

  return (
    <Route
      {...rest}
      render={() => isLoggedIn && isAdmin && !isLoading && children}
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

          <AdminRoutes exact path="/fagartikkelForm">
            <FagartikkelForm />
          </AdminRoutes>

          <Route exact path="/artikkelVisning/:id">
            <ArtikkelVisning />
          </Route>

          <Route exact path="/kontorVisning/:id">
            <KontorVisning />
          </Route>

          <Route exact path="/artikkelVisning/fagartikkelRedigering/:id">
            <FagartikkelRedigering />
          </Route>

          <Route exact path="/registrationForm">
            <UserForm />
          </Route>
          <Route exact path="/loginForm">
            <LoginForm />
          </Route>
          <Route exact path="/aggregering">
            <Aggregering />
          </Route>

          <Route exact path="/kontaktSide">
            <KontaktSide />
          </Route>
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;
