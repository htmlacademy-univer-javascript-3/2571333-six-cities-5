import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authData, CardProps, FullOfferInfo, UserData } from '../recources/Types.ts';
import { clearUserData, fillOffers, setAuthorizationStatus, setComments, setFavorites, setFavoritesLoadingStatus, setLoadingOfferComments, setLoadingOneOfferStatus, setNearbyOffers, setOffer, setOffersLoadingStatus, setUserData } from './actions.ts';
import { APIRoutes } from '../recources/APIRoutes.ts';
import { ActionTypes } from '../recources/ActionTypes.ts';
import { AppDispatch, State } from '../hooks/useAppSelector.ts';
import { StatusCodes } from 'http-status-codes';
import { dropToken, saveToken } from '../api.ts';
import { LoadingStatus } from '../recources/LoadingStatus.ts';
import { ReviewProps } from '../components/Review/Review.tsx';
import { ReviewFormState } from '../components/ReviewForm/ReviewForm.tsx';

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
    dispatch(setLoadingOfferComments(LoadingStatus.Pending));
    const { data: comments } = await api.get<ReviewProps[]>(APIRoutes.COMMENTS.GET(id));
    dispatch(setComments(comments));
    dispatch(setLoadingOfferComments(LoadingStatus.Success));
  },
);

export const createComment = createAsyncThunk<void, { form: ReviewFormState } & { offerId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.COMMENTS}/create`,
  async ({ offerId, form }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<ReviewProps>(APIRoutes.COMMENTS.POST(offerId), form);

    const state = getState();

    if (status === Number(StatusCodes.CREATED) && state[ActionTypes.OFFER].offer && state[ActionTypes.OFFER].offer?.id === Number(offerId)) {
      dispatch(fetchComments(offerId));
    }
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.FAVORITES}/fetch`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFavoritesLoadingStatus(LoadingStatus.Pending));
    const {status, data} = await api.get<CardProps[]>(APIRoutes.FAVORITE.GET);
    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setFavoritesLoadingStatus(LoadingStatus.Failure));
      return;
    }

    dispatch(setFavorites(data));
    dispatch(setFavoritesLoadingStatus(LoadingStatus.Success));
  },
);

export const changeFavorite = createAsyncThunk<void, { offerId: string; favoriteStatus: boolean; offerPageId?: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  `${ActionTypes.FAVORITES}/change`,
  async ({ offerId, favoriteStatus, offerPageId }, { dispatch, extra: api }) => {
    const { status } = await api.post<ReviewFormState>(APIRoutes.FAVORITE.SET_STATUS(offerId, favoriteStatus ? 1 : 0));

    if ((status === Number(StatusCodes.CREATED) || status === Number(StatusCodes.OK))) {
      dispatch(fetchFavorites());
      dispatch(fetchOffers());
      if (offerPageId) {
        dispatch(fetchOffersNearby(offerPageId));
      }
    }
  },
);
