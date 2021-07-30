import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isAuthorized: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_AUTH:
      return {
        isAuthorized: action.payload,
      };

    default:
      return state;
  }
};
