import {createAction} from '@reduxjs/toolkit';
import { City } from '../components/Map/Map';
import { CardProps, UserData } from '../recources/Types';
import { ActionTypes } from '../recources/ActionTypes';

export const changeCity = createAction<City>(`${ActionTypes.CITY}/change`);
export const fillOffers = createAction<CardProps[]>(`${ActionTypes.OFFERS}/fill`);
export const setOffersLoadingStatus = createAction<boolean>(`${ActionTypes.OFFERS}/loading`);
export const setAuthorizationStatus = createAction<boolean>(`${ActionTypes.USER}/authorization`);
export const setUserData = createAction<UserData | null>(`${ActionTypes.USER}/setData`);
