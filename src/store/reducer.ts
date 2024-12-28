import {createReducer} from '@reduxjs/toolkit';
import { CITIES } from '../recources/Cities';
import { changeCity, clearUserData, fillOffers, setAuthorizationStatus, setOffersLoadingStatus, setUserData, } from './actions';
import { City } from '../components/Map/Map';
import { CardProps, UserData } from '../recources/Types';

export type appState = {
  city: City;
  stateOffers: CardProps[];
  isLoadingOffers: boolean;
  authorizationStatus: boolean;
  userData: UserData | null;
}

const startState: appState = {
  city: CITIES.Paris,
  stateOffers: [],
  isLoadingOffers: false,
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
    });
});

export {reducer};
