import React, { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hjem from '../pages/HjemPage';
import Kontorer from '../pages/KontorerPage';
import FagartikkelForm from '../pages/FagartikkelPage';
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
          <Route exact path="/artikkel">
            <FagartikkelForm />
          </Route>
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;