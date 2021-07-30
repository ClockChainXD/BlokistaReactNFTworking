import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface MakeStylesPropsType {
  delay: number;
  rotate: number;
}

const useStyles = makeStyles<Theme, MakeStylesPropsType>(theme => ({
  '@keyframes fadeDelay': {
    '0%, 39%, 100%': {
      opacity: 1,
    },
    '40%': {
      opacity: 0.5,
    },
  },
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    '&:before': {
      content: "''",
      display: 'block',
      margin: '0 auto',
      width: '11%',
      height: '25%',
      backgroundColor: theme.palette.surface[4],
      animation: '$fadeDelay 1.2s infinite ease-in-out both',
      animationDelay: props => `${props.delay}s`,
    },
  },
  rotate: {
    transform: props => `rotate(${props.rotate}deg)`,
  },
}));

const LoaderChip = ({ delay, rotate }) => {
  const classes = useStyles({ delay, rotate });

  return (
    <div
      className={clsx(classes.root, {
        [classes.rotate]: rotate,
      })}
    />
  );
};

LoaderChip.propTypes = {
  delay: PropTypes.number,
  rotate: PropTypes.number,
};

LoaderChip.defaultProps = {
  delay: 0,
  rotate: 0,
};

export default LoaderChip;
