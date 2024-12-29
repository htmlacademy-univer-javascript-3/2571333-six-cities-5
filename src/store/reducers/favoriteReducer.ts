import { createReducer } from '@reduxjs/toolkit';

import { setFavorites, setFavoritesLoadingStatus } from '../actions';
import { CardProps } from '../../recources/Types';
import { LoadingStatus } from '../../recources/LoadingStatus';


type FavoritesState = {
  favorites: CardProps[];
  isFavoritesDataLoading: LoadingStatus;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesDataLoading: LoadingStatus.Init,
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoadingStatus, (state, action) => {
      state.isFavoritesDataLoading = action.payload;
    });
});

export { favoritesReducer };