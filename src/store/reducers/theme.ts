import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  theme: 'light',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        theme: action.payload.theme,
      };

    default:
      return state;
  }
};
