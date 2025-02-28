import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slicesName';
import { TUser } from '@utils-types';
import { TUserResponse } from '@api';
import { RootState } from 'src/services/store';

export interface TUserState {
  data: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  error: string;
}

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  error: ''
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    checkUser: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.isAuthChecked = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action): action is PayloadAction<TUserResponse> =>
        action.type.startsWith('user/') && action.type.endsWith('/pending'),
      (state) => {
        state.loginUserRequest = true;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<TUserResponse> =>
        action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
      (state, action) => {
        if (action.payload && action.payload.user) {
          state.data = action.payload.user;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        } else {
          state.data = null;
          state.isAuthenticated = false;
          state.isAuthChecked = true;
        }
        state.loginUserRequest = false;
      }
    );

    builder.addMatcher(
      (action): action is PayloadAction<string> =>
        action.type.startsWith('user/') && action.type.endsWith('/rejected'),
      (state, action: PayloadAction<string>) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.error = action.payload;
      }
    );
  }
});

export const { checkUser, userLogout } = userSlice.actions;
export const selectUserData = (state: RootState) => state[USER_SLICE_NAME].data;
export const selectAuthChecked = (state: RootState) =>
  state[USER_SLICE_NAME].isAuthChecked;
export const selectAuthenticated = (state: RootState) =>
  state[USER_SLICE_NAME].isAuthenticated;
export const selectloginUserRequest = (state: RootState) =>
  state[USER_SLICE_NAME].loginUserRequest;
export const selectErrorRequest = (state: RootState) =>
  state[USER_SLICE_NAME].error;
