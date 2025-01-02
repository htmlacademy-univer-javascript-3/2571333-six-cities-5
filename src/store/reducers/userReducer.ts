import {createReducer} from '@reduxjs/toolkit';
import { UserData } from '../../recources/Types';
import { clearUserData, setAuthorizationStatus, setUserData } from '../actions';


export type UserState = {
  authorizationStatus: boolean;
  userData: UserData | null;
};

const initialState: UserState = {
  authorizationStatus: false,
  userData: null
};

const userReducer = createReducer(initialState, (builder) => {
  builder
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

export {userReducer};
