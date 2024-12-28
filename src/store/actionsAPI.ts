import { State } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authData, CardProps, FullOfferInfo, UserData } from '../recources/Types.ts';
import { clearUserData, fillOffers, setAuthorizationStatus, setComments, setLoadingOfferComments, setLoadingOneOfferStatus, setNearbyOffers, setOffer, setOffersLoadingStatus, setUserData } from './actions.ts';
import { APIRoutes } from '../recources/APIRoutes.ts';
import { ActionTypes } from '../recources/ActionTypes.ts';
import { AppDispatch } from '../hooks/useAppSelector.ts';
import { StatusCodes } from 'http-status-codes';
import { dropToken, saveToken } from '../api.ts';
import { LoadingStatus } from '../recources/LoadingStatus.ts';
import { ReviewProps } from '../components/Review/Review.tsx';

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
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoutes.USER.LOGOUT);
    dispatch(setAuthorizationStatus(false));
    dispatch(clearUserData());
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
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data } = await api.get<CardProps[]>(APIRoutes.OFFERS.ALL);
    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchOneOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.OFFER}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoadingOneOfferStatus(LoadingStatus.Pending));
    const { status, data } = await api.get<FullOfferInfo>(APIRoutes.OFFERS.EXACT(id));
    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setLoadingOneOfferStatus(LoadingStatus.Failure));
      return;
    }
    dispatch(setOffer(data));
    dispatch(setLoadingOneOfferStatus(LoadingStatus.Success));
  },
);

export const fetchOffersNearby = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.OFFERS}/nearby`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data: nearbyOffers } = await api.get<CardProps[]>(APIRoutes.OFFERS.NEARBY(id));
    dispatch(setNearbyOffers(nearbyOffers));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.COMMENTS}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data: comments } = await api.get<ReviewProps[]>(APIRoutes.COMMENTS.GET(id));
    dispatch(setComments(comments));
    dispatch(setLoadingOfferComments(LoadingStatus.Success));
  },
);
