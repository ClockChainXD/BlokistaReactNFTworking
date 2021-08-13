import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import NavigationItem from './NavigationItem';
import { FormControl, Input, InputAdornment, InputBase, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { SearchOutlined, SearchRounded, SearchSharp, YoutubeSearchedForOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    display: 'flex',
    paddingLeft: 0,
    height: theme.spacing(2.5),
    paddingTop: '25px',
    alignItems: 'center',
    flex: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  margin:{
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#000",
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    marginRight: '30px',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    color : "#fff",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavigationList = () => {
  const classes = useStyles();

  return (
    <Box component="ul" className={classes.root}>
      <NavigationItem label="Create" path="/create" />
      <span style={{margin:"0px 20px"}}  />
      <NavigationItem label="Explore" path="/explore" />
      <span style={{marginRight:"200px"}} />

      <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchSharp />
          </div>
          <InputBase
            placeholder="Search items, collections, and accounts"
            
            className={classes.inputInput}
            inputProps={{ 'aria-label': 'search' }}
          />
      </div>
    </Box>
  );
};
export default NavigationList;
