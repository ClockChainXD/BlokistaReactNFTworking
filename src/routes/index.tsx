import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';
import AuthLayout from '../components/Layout/AuthLayout';
import Home from '../containers/Home';
import ProductDetail from '../containers/ProductDetail';
import Stats from '../containers/Stats';
import Explore from '../containers/Explore';
import Create from '../containers/Create/create';
import EditProfile from '../containers/EditProfile';
import Profile from '../containers/Profile';

import SignIn from '../containers/Auth/SignIn';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/home" />)} />

      <PublicRoute
        path="/auth/login"
        component={SignIn}
        layout={AuthLayout}
      />

      <PrivateRoute
        path="/home" // Home
        component={Home}
        layout={Layout}
      />

      <PrivateRoute
        path="/create" // Create Edit NFT
        component={Create}
        layout={Layout}
      />

      {/* <PrivateRoute
        path="/stats" // Artist Header Page
        component={Stats}
        layout={Layout}
      /> */}

      <PrivateRoute
        path="/product/:baseId" // NFT detail
        component={ProductDetail}
        layout={Layout}
      />

      <PrivateRoute // Explore
        path="/explore"
        component={Explore}
        layout={Layout}
      />
      <PrivateRoute
        path="/profile/edit"
        component={EditProfile}
        layout={Layout}
      />
      <PrivateRoute
        path="/profile/:customUrl"
        component={Profile}
        layout={Layout}
        
      />
    </Switch>
  </>
);

export default Routes;
