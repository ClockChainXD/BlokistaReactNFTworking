import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
}));

const AuthLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header isAuthorized={false} />

      <Container maxWidth="xl" className={classes.container}>
        {children}
      </Container>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
