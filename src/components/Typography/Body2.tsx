import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

const useStyles = makeStyles<Theme>(theme => ({
  root: {
    color: theme.typography.body2.color,
  },
}));

const Body2 = forwardRef<Ref<any>, TypographyProps>(({ color = 'primary', className, ...rest }, ref) => {
  const classes = useStyles({ color });

  return <Typography className={clsx(classes.root, className)} variant="body2" innerRef={ref} {...rest} />;
});

export default Body2;
