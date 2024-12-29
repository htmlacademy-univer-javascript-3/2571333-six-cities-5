import {combineReducers} from '@reduxjs/toolkit';
import { ActionTypes } from '../recources/ActionTypes';
import { cityReducer } from './reducers/cityReducer';
import { userReducer } from './reducers/userReducer';
import { offersReducer } from './reducers/offersReducer';
import { offerReducer } from './reducers/offerReducer';
import { commentsReducer } from './reducers/commentsReducer';

const reducer = combineReducers({
  [ActionTypes.USER]: userReducer,
  [ActionTypes.CITY]: cityReducer,
  [ActionTypes.OFFERS]: offersReducer,
  [ActionTypes.OFFER]: offerReducer,
  [ActionTypes.COMMENTS]: commentsReducer,
});

export {reducer};
