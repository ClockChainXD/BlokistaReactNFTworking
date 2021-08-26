import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
  },
  icon: {
    marginLeft: 16,
    '& svg': {
      fontSize: 17,
    },
  },
  primary: {
    background: 'linear-gradient(140deg, rgba(242,220,102,1) 16%, rgba(255,37,213,0.8519782913165266) 68%)',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.warning.light,
    },
  },
  error: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      background: theme.palette.warning.light,
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  success: {
    background: 'linear-gradient(140deg, rgba(242,220,102,1) 16%, rgba(255,37,213,0.8519782913165266) 68%)',
    color: theme.palette.success.contrastText,
    '&:hover': {
      background: theme.palette.warning.light,
    },
  },
}));

const FilledButton = ({ className, label, icon, size, handleClick, color, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className, classes[color], disabled ? classes.disabled : '')}
      variant="contained"
      size={size}
      onClick={handleClick}
      type="submit"
    >
      {label}
      {Boolean(icon) && <span className={clsx(classes.icon, classes.root)}>{icon}</span>}
    </Button>
  );
};

FilledButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  handleClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'error', 'success']),
  disabled: PropTypes.bool,
};

FilledButton.defaultProps = {
  className: '',
  icon: '',
  size: 'medium',
  handleClick: () => {},
  color: 'primary',
  disabled: false,
};

export default FilledButton;
