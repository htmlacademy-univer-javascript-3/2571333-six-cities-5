import { State } from 'history';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CardProps } from '../recources/Types.ts';
import { fillOffers, setOffersLoadingStatus } from './actions.ts';
import { APIRoutes } from '../recources/APIRoutes.ts';
import { ActionTypes } from '../recources/ActionTypes.ts';
import { AppDispatch } from '../hooks/useAppSelector.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  `${ActionTypes.OFFERS}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<CardProps[]>(APIRoutes.OFFERS.ALL);
    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);
