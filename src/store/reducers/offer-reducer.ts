import {createReducer} from '@reduxjs/toolkit';
import { FullOfferInfo } from '../../recources/types';
import { LoadingStatus } from '../../recources/loading-status';
import { clearOffer, setActiveOffer, setLoadingOneOfferStatus, setOffer } from '../actions';


export type OfferState = {
  offer?: FullOfferInfo;
  isOfferDataLoading: LoadingStatus;
  activeOffer?: string;
};

const initialState: OfferState = {
  offer: undefined,
  isOfferDataLoading: LoadingStatus.Init
};

const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = undefined;
      state.isOfferDataLoading = LoadingStatus.Init;
    })
    .addCase(setLoadingOneOfferStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export {offerReducer};
