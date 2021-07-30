import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import profileReducer from './profile';
import profileListReducer from './profileList';
import pricesReducer from './prices';

import main from './reducers/main';
import theme from './reducers/theme';
import common from './reducers/common';
import auth from './reducers/auth';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    prices: pricesReducer,
    profile: profileReducer,
    profileList: profileListReducer,
    main: main,
    theme: theme,
    common: common,
    auth: auth,
  },
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
