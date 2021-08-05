import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import NavigationItem from './NavigationItem';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    display: 'flex',
    paddingLeft: 0,
    height: theme.spacing(2.5),
    alignItems: 'center',
    flex: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  bar: {
    height: '100%',
    width: 2,
    backgroundColor: theme.palette.surface[2],
    display: 'inline-block',
  },
}));

const NavigationList = () => {
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <NavigationItem label="Create" path="/create" />
      <span style={{margin:"0px 60px"}} className={classes.bar} />
      <NavigationItem label="Explore" path="/explore" />
    </Box>
  );
};
export default NavigationList;
