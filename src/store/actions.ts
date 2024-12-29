import {createAction} from '@reduxjs/toolkit';
import { City } from '../components/Map/Map';
import { CardProps, FullOfferInfo, UserData } from '../recources/Types';
import { ActionTypes } from '../recources/ActionTypes';
import { LoadingStatus } from '../recources/LoadingStatus';
import { ReviewProps } from '../components/Review/Review';

export const changeCity = createAction<City>(`${ActionTypes.CITY}/change`);
export const setAuthorizationStatus = createAction<boolean>(`${ActionTypes.USER}/authorization`);

export const fillOffers = createAction<CardProps[]>(`${ActionTypes.OFFERS}/fill`);
export const setOffersLoadingStatus = createAction<LoadingStatus>(`${ActionTypes.OFFERS}/loading`);

export const setUserData = createAction<UserData | null>(`${ActionTypes.USER}/setData`);
export const clearUserData = createAction(`${ActionTypes.USER}/clear`);

export const setOffer = createAction<FullOfferInfo>(`${ActionTypes.OFFER}/set`);
export const clearOffer = createAction(`${ActionTypes.OFFER}/clear`);
export const setLoadingOneOfferStatus = createAction<LoadingStatus>(`${ActionTypes.OFFER}/loading`);
export const setActiveOffer = createAction<string | undefined>(`${ActionTypes.OFFER}/setActive`);

export const setComments = createAction<ReviewProps[]>(`${ActionTypes.COMMENTS}/set`);
export const clearComments = createAction(`${ActionTypes.COMMENTS}/clear`);
export const setLoadingOfferComments = createAction<LoadingStatus>(`${ActionTypes.COMMENTS}/loading`);

export const setNearbyOffers = createAction<CardProps[]>(`${ActionTypes.OFFERS}/nearby`);
export const clearNearbyOffers = createAction(`${ActionTypes.OFFERS}/clearNearby`);
export const setLoadingNerbyOffers = createAction<LoadingStatus>(`${ActionTypes.OFFERS}/loading`);

export const setFavorites = createAction<CardProps[]>(`${ActionTypes.FAVORITES}/fill`);
export const setFavoritesLoadingStatus = createAction<LoadingStatus>(`${ActionTypes.FAVORITES}/loading`);
