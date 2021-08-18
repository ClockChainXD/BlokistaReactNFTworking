

import auth from './reducers/auth';
import common from './reducers/common';
import main from './reducers/main';
import theme from './reducers/theme';
import search from './search';
/* Theme */
export const CHANGE_THEME = 'CHANGE_THEME';
/* Theme */

export const UPDATE_AUTH = 'UPDATE_AUTH';

/* Common */
export const HANDLE_ACCORDION = 'HANDLE_ACCORDION';
/* Common */


/*  Search */
export const CHANGE_SEARCH='CHANGE_SEARCH';


/* Repositories */
export const GET_ALL_REPOSITORIES_REQUEST = 'GET_ALL_REPOSITORIES_REQUEST';
export const GET_ALL_REPOSITORIES_SUCCESS = 'GET_ALL_REPOSITORIES_SUCCESS';
export const GET_ALL_REPOSITORIES_FAILURE = 'GET_ALL_REPOSITORIES_FAILURE';
/* Repositories */

/* Contributors */
export const GET_ALL_CONTRIBUTORS_REQUEST = 'GET_ALL_CONTRIBUTORS_REQUEST';
export const GET_ALL_CONTRIBUTORS_SUCCESS = 'GET_ALL_CONTRIBUTORS_SUCCESS';
export const GET_ALL_CONTRIBUTORS_FAILURE = 'GET_ALL_CONTRIBUTORS_FAILURE';
/* Contributors */

export interface ReducerState {
  auth: ReturnType<typeof auth>;
  common: ReturnType<typeof common>;
  main: ReturnType<typeof main>;
  theme: ReturnType<typeof theme>;
  search: ReturnType<typeof search>;
}
