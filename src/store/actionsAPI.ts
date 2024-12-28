import { State } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authData, CardProps, UserData } from '../recources/Types.ts';
import { fillOffers, setAuthorizationStatus, setOffersLoadingStatus, setUserData } from './actions.ts';
import { APIRoutes } from '../recources/APIRoutes.ts';
import { ActionTypes } from '../recources/ActionTypes.ts';
import { AppDispatch } from '../hooks/useAppSelector.ts';
import { StatusCodes } from 'http-status-codes';
import { dropToken, saveToken } from '../api.ts';

export const userLogin = createAsyncThunk<void, authData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.USER}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { status, data } = await api.post<UserData>(APIRoutes.USER.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } else {
      dispatch(setAuthorizationStatus(false));
    }
  }
);

export const userLogout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.USER}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoutes.USER.LOGOUT);
    dispatch(setAuthorizationStatus(false));
    dispatch(setUserData(null));
    dropToken();
  },
);

export const userCheckAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.USER}/login`,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoutes.USER.VALIDATE);
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } catch {
      dispatch(setAuthorizationStatus(false));
      dispatch(setUserData(null));
    }
  },
);

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.OFFERS}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<CardProps[]>(APIRoutes.OFFERS.ALL);
    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);
