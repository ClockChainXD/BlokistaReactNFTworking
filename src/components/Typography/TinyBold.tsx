import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.type === 'light' ? 'black' : 'white',
  },
}));

const TinyBold = forwardRef<Ref<any>, TypographyProps>(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return <Typography className={clsx(classes.root, className)} variant="h5" innerRef={ref} {...rest} />;
});

export default TinyBold;
