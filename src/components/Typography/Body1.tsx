import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
// import { TypographyPropsTypes } from '';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.typography.body1.color,
  },
}));

const Body1 = forwardRef<Ref<any>, TypographyProps>(({ color = 'primary', className, ...rest }, ref) => {
  const classes = useStyles({ color });

  return <Typography className={clsx(classes.root, className)} variant="body1" innerRef={ref} {...rest} />;
});

export default Body1;
