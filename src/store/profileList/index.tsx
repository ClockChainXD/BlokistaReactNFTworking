/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileListState, Profile } from '../types';
import type { AppDispatch } from '../';
import getProfileList from './getProfileList';

const initialState: ProfileListState = {
  isInitialized: false,
  isLoading: true,
  data: null,
};

export const profileListSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileListFetchStart: state => {
      state.isLoading = true;
    },
    profileListFetchSucceeded: (_state, action: PayloadAction<Profile[]>) => {
      const profile = action.payload;

      return {
        isInitialized: true,
        isLoading: false,
        data: profile,
      };
    },
    profileListFetchFailed: state => {
      state.isLoading = false;
      state.isInitialized = true;
    },
    profileListClear: () => ({
      ...initialState,
      isLoading: false,
    }),
  },
});

// Actions
export const { profileListFetchStart, profileListFetchSucceeded, profileListFetchFailed, profileListClear } =
  profileListSlice.actions;

// Thunks
// TODO: this should be an AsyncThunk
export const fetchProfileList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileListFetchStart());
    const response = await getProfileList();
    dispatch(profileListFetchSucceeded(response));
  } catch (error) {
    dispatch(profileListFetchFailed());
  }
};

export default profileListSlice.reducer;
