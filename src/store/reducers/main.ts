import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: true,

  organizations: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_REPOSITORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_ALL_REPOSITORIES_SUCCESS:
      return {
        ...state,
        organizations: {
          ...state.organizations,
          [action.payload.org]: action.payload.data,
        },
      };
    case actionTypes.GET_ALL_REPOSITORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.GET_ALL_CONTRIBUTORS_REQUEST:
      return { ...state };
    case actionTypes.GET_ALL_CONTRIBUTORS_SUCCESS:
      const org = state.organizations[action.payload.org];
      const repoIndex = org.findIndex((repo) => repo.name === action.payload.repo);
      if (repoIndex > -1) {
        org[repoIndex] = {
          ...org[repoIndex],
          contributors: action.payload.data,
        };
      }
      return {
        ...state,
        organizations: {
          ...state.organizations,
          [action.payload.org]: org,
        },
        isLoading: false,
      };
    case actionTypes.GET_ALL_CONTRIBUTORS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
