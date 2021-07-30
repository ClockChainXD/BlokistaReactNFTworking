import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import TinyBold from '../../../Typography/TinyBold';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 3),
  },
  label: {
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: theme.palette.surface[2],
    },
  },
}));

const NavigationItem = ({
  path,
  label,
}) => {
  const classes = useStyles();

  return (
    <Box component="li">
      <Link to={path} className={classes.link}>
        <TinyBold  className={classes.label}>
          {label}
        </TinyBold>
      </Link>
    </Box>
  );
};

NavigationItem.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavigationItem;
