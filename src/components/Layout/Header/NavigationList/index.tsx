import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import NavigationItem from './NavigationItem';
import { FormControl, Input, InputAdornment, InputBase, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { SearchOutlined, SearchRounded, SearchSharp, YoutubeSearchedForOutlined } from '@material-ui/icons';
import { useSearchTerm } from '../../../../hooks/useSearch';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchState } from '../../../../store/types'
import search from '../../../../store/search';
import { useAppDispatch } from '../../../../store';
import { setSearchAction } from '../../../../store/actions/search';
import { useHistory } from 'react-router-dom';

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
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  margin: {
    margin : '0 30px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    width: '40%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      marginRight : '0',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    color : theme.palette.text.secondary,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    border: '1px solid black',
    borderRadius : theme.shape.borderRadius,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '20px',
      },
    },
  },
}));

const NavigationList = () => {
  const classes = useStyles();
  const[sea,setSea]=useState<string>("");
  const dispatch=useDispatch();
  const history=useHistory();
  const[searchy,setSearchy]=useState("");


function handleSearch(){
  if(searchy){
  dispatch(setSearchAction(searchy));
  history.push(`/explore`);
}
}

  return (
    <Box component="ul" className={classes.root}>
      <NavigationItem label="Create" path="/create" />
      <span className={classes.margin}  />
      <NavigationItem label="Explore" path="/explore" />
      <span style={{marginRight: '120px'}}  />

      <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchSharp />
          </div>
          <InputBase
            placeholder="Search items, Galleries and accounts"
            className={classes.input}
            inputProps={{ 'aria-label': 'search' }}
            onChange={ val => {setSearchy(val.target.value);
            console.log(val.target.value);}}
            onKeyDown = { e => { if(e.key==='Enter')  handleSearch();} }
          />
      </div>
    </Box>
  );
};
export default NavigationList;

