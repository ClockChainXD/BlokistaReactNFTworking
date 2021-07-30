import config from '../../utils/config';
import storageService from '../../services/storage.service';
import * as actionTypes from '../actionTypes';

export const loadThemeAction = () => async (dispatch) => {
  const theme = storageService.getItem(config.themeKey);
  if (theme) {
    dispatch({
      type: actionTypes.CHANGE_THEME,
      payload: { theme },
    });
  }
};

export const changeThemeAction = (theme) => async (dispatch) => {
  storageService.setItem(config.themeKey, theme);

  dispatch({
    type: actionTypes.CHANGE_THEME,
    payload: { theme },
  });
};
