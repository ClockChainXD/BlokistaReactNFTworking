import config from '../../utils/config';
import storageService from '../../services/storage.service';
import * as actionTypes from '../actionTypes';

export const loadSearchAction = () => async (dispatch) => {
  const searchTerm = storageService.getItem(config.searchKey);
  if (searchTerm) {
    dispatch({
      type: actionTypes.CHANGE_SEARCH,
      payload: { searchTerm },
    });
  }
};

export const setSearchAction = (searchTerm) => async (dispatch) => {
  storageService.setItem(config.searchKey, searchTerm);

  dispatch({
    type: actionTypes.CHANGE_SEARCH,
    payload: { searchTerm },
  });
};
