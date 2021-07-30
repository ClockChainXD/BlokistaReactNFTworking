import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import TinyBold from '../../Typography/TinyBold';
import Container from '../Container';

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 0),
  },
  breadcrumbs: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goBack: {
    width: 'auto',
    fontSize: 13,
    border: `2px solid ${theme.palette.surface[2]}`,
  },
  icon: {
    fontSize: 14,
    marginRight: 15,
  },
  current: {
    color: theme.palette.text.primary,
  },
}));

const SubHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Button className={classes.goBack} variant="outlined" onClick={() => history.push('/home')}>
          <ArrowBackIcon className={classes.icon} />
          Back to home
        </Button>

        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link color="inherit" href="/">
            Profile
          </Link>
          <TinyBold className={classes.current} >
            Activity
          </TinyBold>
        </Breadcrumbs>
      </Container>
    </div>
  );
};

SubHeader.propTypes = {};

SubHeader.defaultProps = {};

export default SubHeader;
