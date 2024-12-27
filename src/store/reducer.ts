import {createReducer} from '@reduxjs/toolkit';
import { CITIES } from '../recources/Cities';
import { mockOffers } from '../mocks/offers';
import { setCity, setOffers } from './actions';

const startState = {
  city: CITIES.Paris,
  stateOffers: mockOffers
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(setOffers, (state, action) => {
      const {offers} = action.payload;
      state.stateOffers = offers;
    });
});

export {reducer};
