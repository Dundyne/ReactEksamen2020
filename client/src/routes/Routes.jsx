import React, { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hjem from '../pages/HjemPage';
import Kontorer from '../pages/KontorerPage';
import KontorerForm from '../pages/KontorerFormPage';
import FagartikkelForm from '../pages/FagartikkelFormPage';
import Fagartikler from '../pages/FagartiklerPage';
import UserForm from '../pages/UserFormPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

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
          <Route exact path="/fagartikler">
            <Fagartikler />
          </Route>
          <Route exact path="/kontorerForm">
            <KontorerForm />
          </Route>
        <Route exact path = "/loginForm">
          <UserForm/>
        </Route>
        
        
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;