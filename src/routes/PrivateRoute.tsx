import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store/actionTypes';

const PrivateRoute = ({ path, component: C, layout: L, user, props: cProps }) => {
  const { isAuthorized } = useSelector((state: ReducerState) => state.auth);

  return (
    <Route
      {...path}
      render={props =>
        isAuthorized ? (
          <L>
            <C {...props} {...cProps} />
          </L>
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  user: PropTypes.object,
  props: PropTypes.object,
};

PrivateRoute.defaultProps = {
  path: '',
  user: null,
  props: {},
};

export default PrivateRoute;
