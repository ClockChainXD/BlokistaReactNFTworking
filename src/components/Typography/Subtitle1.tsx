import React, { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    color: theme.palette.type === 'light' ? 'black' : 'white',
  },
}));

const SubTitle1 = forwardRef<Ref<any>, TypographyProps>(({ color = 'secondary', className, ...rest }, ref) => {
  const classes = useStyles({ color });

  return <Typography className={clsx(classes.root, className)} variant="subtitle1" innerRef={ref} {...rest} />;
});

export default SubTitle1;
