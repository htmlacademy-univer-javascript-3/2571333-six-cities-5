import {createReducer} from '@reduxjs/toolkit';
import { CardProps } from '../../recources/Types';
import { LoadingStatus } from '../../recources/LoadingStatus';
import { clearNearbyOffers, fillOffers, setNearbyOffers, setOffersLoadingStatus } from '../actions';


type OffersState = {
  offers: CardProps[];
  nearbyOffers: CardProps[];
  isOffersDataLoading: LoadingStatus;
};

const initialState: OffersState = {
  offers: [],
  nearbyOffers: [],
  isOffersDataLoading: LoadingStatus.Init
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = [];
      state.isOffersDataLoading = LoadingStatus.Success;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {offersReducer};
