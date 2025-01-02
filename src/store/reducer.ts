import {combineReducers} from '@reduxjs/toolkit';
import { ActionTypes } from '../recources/action-types';
import { cityReducer } from './reducers/city-reducer';
import { userReducer } from './reducers/user-reducer';
import { offersReducer } from './reducers/offers-reducer';
import { offerReducer } from './reducers/offer-reducer';
import { commentsReducer } from './reducers/comments-reducer';
import { favoritesReducer } from './reducers/favorites-reducer';

export type FullState = ReturnType<typeof reducer>;

const reducer = combineReducers({
  [ActionTypes.USER]: userReducer,
  [ActionTypes.CITY]: cityReducer,
  [ActionTypes.OFFERS]: offersReducer,
  [ActionTypes.OFFER]: offerReducer,
  [ActionTypes.COMMENTS]: commentsReducer,
  [ActionTypes.FAVORITES]: favoritesReducer,
});

export {reducer};
