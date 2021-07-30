import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import Body1 from '../Typography/Body1';
import Tiny from '../Typography/Tiny';

const useStyles = makeStyles(theme => ({
  alertText: {
    color: theme.palette.error.main,
  },
  title: {
    marginBottom: theme.spacing(0.5),
    letterSpacing: 0.2,
    fontSize: 14,
    fontWeight: 700,
    color: 'rgb(255, 87, 87)',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  },
}));

const CustomAlert = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 94,
  },
  message: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(1),
    letterSpacing: 0,
  },
  standardError: {
    backgroundColor: 'transparent',
  },
  action: {
    marginRight: 14,
  },
}))(Alert);

const ErrorAlert = ({ title, description, show }) => {
  const classes = useStyles();

  return (
    show && (
      <span className={classes.root}>
        <Body1 className={clsx(classes.alertText, classes.title)}>{title}</Body1>
        <Tiny className={classes.alertText}>{description}</Tiny>
      </span>
    )
  );
};

ErrorAlert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.node,
};

ErrorAlert.defaultProps = {
  avatar: '',
};

export default ErrorAlert;
