import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    border: theme.palette.type === 'dark' ? `2px solid ${theme.palette.surface[2]}` : 'none',
    background: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    borderRadius: theme.shape.cardBorderRadius,
    padding: 20,
  },
}));

const Pane = ({
  children,
  className,
}) => {
  const classes = useStyles();

  return (
    <Paper
      className={clsx(classes.root, className)}
      elevation={0}
    >
      {children}
    </Paper>
  );
};

Pane.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Pane.defaultProps = {
  className: '',
};

export default Pane;
