import React, { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';
import TestPage from '../pages/TestPage';
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
            <TestPage />
          </Route>
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;