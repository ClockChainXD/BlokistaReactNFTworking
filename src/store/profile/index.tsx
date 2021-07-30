/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, Profile } from '../../store/types';
import type { AppDispatch } from '../../store';
import getProfile from './getProfile';

const initialState: ProfileState = {
  isInitialized: false,
  isLoading: true,
  data: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileFetchStart: state => {
      state.isLoading = true;
    },
    profileFetchSucceeded: (_state, action: PayloadAction<Profile>) => {
      const profile = action.payload;

      return {
        isInitialized: true,
        isLoading: false,
        data: profile,
      };
    },
    profileFetchFailed: state => {
      state.isLoading = false;
      state.isInitialized = true;
    },
    profileClear: () => ({
      ...initialState,
      isLoading: false,
    }),
  },
});

// Actions
export const { profileFetchStart, profileFetchSucceeded, profileFetchFailed, profileClear } = profileSlice.actions;

// Thunks
// TODO: this should be an AsyncThunk
export const fetchProfile = (address: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileFetchStart());
    const response = await getProfile(address);
    dispatch(profileFetchSucceeded(response));
  } catch (error) {
    dispatch(profileFetchFailed());
  }
};

export default profileSlice.reducer;
