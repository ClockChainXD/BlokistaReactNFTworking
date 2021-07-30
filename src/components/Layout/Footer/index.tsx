import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Container from '../Container';
import Body1 from '../../Typography/Body1';
import TinyBold from '../../Typography/TinyBold';
import Tiny from '../../Typography/Tiny';
import ExpandableColumn from './ExpandableColumn';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 78,
    },
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.surface[1],
      paddingTop: 59,
    },
  },
  logoWrapper: {
    width: theme.layouts.logo.width.desktop,
    marginBottom: theme.spacing(5),
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(5),
  },
  center: {
    padding: theme.spacing(5, 0),
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottom: {
    padding: theme.spacing(3, 0),
    letterSpacing: 0.4,
  },
  list: {
    marginBottom: 40,
    fontWeight: 500,
  },
  link: {
    marginBottom: 18,
    color: `${theme.palette.text.secondary} !important`,
  },
  description: {
    lineHeight: '24px',
  },
  emailInput: {
    borderRadius: '25px !important',
    marginTop: 24,
    fontSize: 14,
    padding: '3px 9px 3px 0px',
    width: theme.spacing(50),
    borderColor: `${theme.palette.surface[2]} !important`,
  },
  emailSubmit: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  accept: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
  },
  primaryText: {
    color: theme.palette.text.primary,
  },
  column: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0 !important',
      paddingTop: 30,
      borderTop: `1px solid ${theme.palette.surface[2]}`,
    },
  },
  column1: {
    paddingRight: 11,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container className={classes.center}>
          <Grid item md={3} sm={3} xs={12} className={classes.column1}>
            <div className={classes.logoWrapper}>
              <img src={`/assets/images/logo-${theme.palette.type}.png`} alt="logo" />
            </div>
            <Body1>
              1717 Harrison St, San Francisco,
              CA 94103, USA
            </Body1>
          </Grid>
          <Grid item md={4} container spacing={2}>
            <Grid item md={6} sm={6} xs={12}>
              <div className={classes.column}>
                <ExpandableColumn title="Stacks">
                  <Link to="/home">
                    <TinyBold className={classes.link}>Home</TinyBold>
                  </Link>
                  <Link to="/create">
                    <TinyBold className={classes.link}>Create</TinyBold>
                  </Link>
                  <Link to="/explore">
                    <TinyBold className={classes.link}>Explore</TinyBold>
                  </Link>
                  <Link to="/stats">
                    <TinyBold className={classes.link}>Stats</TinyBold>
                  </Link>
                  <Link to="/home">
                    <TinyBold className={classes.link}>Contact</TinyBold>
                  </Link>
                </ExpandableColumn>
              </div>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <div className={classes.column}>
                <ExpandableColumn title="Find us on">
                  <Link to="/">
                    <TinyBold className={classes.link}>Facebook</TinyBold>
                  </Link>
                  <Link to="/">
                    <TinyBold className={classes.link}>Twitter</TinyBold>
                  </Link>
                  <Link to="/">
                    <TinyBold className={classes.link}>Instagram</TinyBold>
                  </Link>
                </ExpandableColumn>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.bottom}>
          <Tiny>
            © Aethereal 2021
          </Tiny>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
