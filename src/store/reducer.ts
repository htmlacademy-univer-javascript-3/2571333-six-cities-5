import {createReducer} from '@reduxjs/toolkit';
import { CITIES } from '../recources/Cities';
import { changeCity, clearComments, clearNearbyOffers, clearOffer, clearUserData, fillOffers, setAuthorizationStatus, setComments, setLoadingOfferComments, setLoadingOneOfferStatus, setNearbyOffers, setOffer, setOffersLoadingStatus, setUserData, } from './actions';
import { City } from '../components/Map/Map';
import { CardProps, FullOfferInfo, UserData } from '../recources/Types';
import { LoadingStatus } from '../recources/LoadingStatus';
import { ReviewProps } from '../components/Review/Review';

export type appState = {
  city: City;
  stateOffers: CardProps[];
  isLoadingOffers: LoadingStatus;
  stateCurrentOffer?: FullOfferInfo;
  isLoadingOneOffer: LoadingStatus;
  stateOfferComments?: ReviewProps[];
  isLoadingOfferComments: LoadingStatus;
  nearbyOffers?: CardProps[];
  authorizationStatus: boolean;
  userData: UserData | null;
}

const startState: appState = {
  city: CITIES.Paris,
  stateOffers: [],
  isLoadingOffers: LoadingStatus.Init,
  isLoadingOneOffer: LoadingStatus.Init,
  isLoadingOfferComments: LoadingStatus.Init,
  authorizationStatus: false,
  userData: null,
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.stateOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isLoadingOffers = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserData, (state) => {
      state.userData = null;
    })
    .addCase(setOffer, (state, action) => {
      state.stateCurrentOffer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.stateCurrentOffer = undefined;
      state.isLoadingOneOffer = LoadingStatus.Init;
    })
    .addCase(setLoadingOneOfferStatus, (state, action) => {
      state.isLoadingOneOffer = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.stateOfferComments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.stateOfferComments = [];
      state.isLoadingOfferComments = LoadingStatus.Init;
    })
    .addCase(setLoadingOfferComments, (state, action) => {
      state.isLoadingOfferComments = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = [];
      state.isLoadingOffers = LoadingStatus.Init;
    });
});

export {reducer};
