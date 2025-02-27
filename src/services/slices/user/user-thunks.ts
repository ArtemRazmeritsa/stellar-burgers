import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  getUserApi,
  TUserResponse,
  TAuthResponse,
  TRegisterData,
  registerUserApi,
  logoutApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  TServerResponse
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { USER_SLICE_NAME } from '../slicesName';
import { userLogout } from './user-slice';

export const getUser = createAsyncThunk<TUserResponse, void>(
  `${USER_SLICE_NAME}/getUser`,
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(dataUser);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error: any) {
      if (error.message === 'User already exists') {
        return rejectWithValue('Такой пользователь уже зарегистрирован');
      }

      return rejectWithValue('Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser: TLoginData) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async (_, { dispatch }) => {
    await logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    });
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(`${USER_SLICE_NAME}/updateUser`, async (userData: Partial<TRegisterData>) =>
  updateUserApi(userData)
);

export const forgotPassword = createAsyncThunk<
  TServerResponse<{}>,
  { email: string }
>(`${USER_SLICE_NAME}/forgotPassword`, async (data: { email: string }) =>
  forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk<
  TServerResponse<{}>,
  { password: string; token: string }
>(
  `${USER_SLICE_NAME}/resetPassword`,
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);
