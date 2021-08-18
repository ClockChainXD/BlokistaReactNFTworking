import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { connect, ConnectedProps } from 'react-redux'
import Explore from '../containers/Explore';
import { SearchState } from './types';
import * as actionTypes from './actionTypes';


const INITIAL_STATE = {
  searchTerm: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH:
      console.log("actiongoes: "+action.payload.searchTerm)
      return {
        searchTerm: action.payload.searchTerm,
      };

    default:
      return state;
  }
};



// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
