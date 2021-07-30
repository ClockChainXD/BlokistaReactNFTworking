import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import LoaderChip from './LoaderChip';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    width: 15,
    height: 15,
  },
}));

const LoaderIndicator = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.wrapper, className)}>
      <LoaderChip />
      <LoaderChip rotate={45} delay={-1.1} />
      <LoaderChip rotate={90} delay={-0.9} />
      <LoaderChip rotate={135} delay={-0.8} />
      <LoaderChip rotate={180} delay={-0.6} />
      <LoaderChip rotate={225} delay={-0.5} />
      <LoaderChip rotate={270} delay={-0.4} />
      <LoaderChip rotate={315} delay={-0.2} />
    </div>
  );
};

LoaderIndicator.propTypes = {
  className: PropTypes.string,
};

LoaderIndicator.defaultProps = {
  className: '',
};

export default LoaderIndicator;
