import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface MakeStylesPropsType {
  size: 'medium' | 'small';
}

const useStyles = makeStyles<Theme, MakeStylesPropsType>(theme => ({
  root: {
    margin: '0 auto',
    maxWidth: props => (props.size === 'small' ? theme.layouts.containerSm : theme.layouts.container),
    width: '100%',
    height: '100%',
    padding: '0 15px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '894px !important',
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(0, 4)} !important`,
    },
  },
}));

const Container = ({ children, className, size }) => {
  const classes = useStyles({ size });

  return <div className={clsx(classes.root, className)}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['medium', 'small']),
};

Container.defaultProps = {
  className: '',
  size: 'medium',
};

export default Container;
