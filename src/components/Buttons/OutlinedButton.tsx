import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.surface[3]}`,
    padding: 5,
  },
  icon: {
    '& svg': {
      fontSize: 16,
      marginTop: 4,
    },
  },
  iconEnd: {
    marginLeft: theme.spacing(1),
  },
  iconStart: {
    marginRight: theme.spacing(1),
  },
}));

const OutlinedButton = ({
  className,
  label,
  icon,
  size,
  iconPosition,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className)}
      variant="outlined"
      size={size}
      onClick={handleClick}
    >
      {iconPosition === 'start' && Boolean(icon) && (
        <span className={clsx(classes.icon, classes.iconStart)}>
          {icon}
        </span>
      )}
      {label}
      {iconPosition === 'end' && Boolean(icon) && (
        <span className={clsx(classes.icon, classes.iconEnd)}>
          {icon}
        </span>
      )}
    </Button>
  );
};

OutlinedButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconPosition: PropTypes.oneOf(['start', 'end']),
  handleClick: PropTypes.func,
};

OutlinedButton.defaultProps = {
  className: '',
  icon: '',
  size: 'medium',
  iconPosition: 'end',
  handleClick: () => {},
};

export default OutlinedButton;
