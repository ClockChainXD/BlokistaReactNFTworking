import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Body1 from '../Typography/Body1';
import Tiny from '../Typography/Tiny';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 500,
    marginBottom: 8,
  },
}));

const LabelWithComment = ({
  className,
  children,
  comment,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Body1 className={classes.title}>{children}</Body1>
      <Tiny>{comment}</Tiny>
    </div>
  );
};

LabelWithComment.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  comment: PropTypes.string,
};

LabelWithComment.defaultProps = {
  className: '',
  comment: '',
};

export default LabelWithComment;
