import { Action } from 'redux';
import { FullState } from '../store/reducer';
import { CITIES } from './Cities';
import { UserState } from '../store/reducers/userReducer';
import { OffersState } from '../store/reducers/offersReducer';
import { LoadingStatus } from './LoadingStatus';
import { OfferState } from '../store/reducers/offerReducer';
import { FavoritesState } from '../store/reducers/favoritesReducer';
import { CommentsState } from '../store/reducers/commentsReducer';
import { CityState } from '../store/reducers/cityReducer';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

const mockUserState: UserState = {
  authorizationStatus: true,
  userData: {
    id: 1,
    name: 'John',
    avatarUrl: 'path/to/avatar.jpg',
    isPro: false,
    email: 'abc@def.gh',
    token: 'AAAAA'
  }
};

const mockOffersState: OffersState = {
  offers: [],
  nearbyOffers: [],
  isOffersDataLoading: LoadingStatus.Success,
};

const mockOfferState: OfferState = {
  offer: {
    id: 1,
    title: 'Title',
    type: 'Appartment',
    previewImage: 'path/to/image.jpg',
    price: 17,
    rating: 5,
    isPremium: false,
    isFavorite: false,
    location: {
      latitude: 15,
      longitude: 18,
      zoom: 10,
    },
    city: CITIES.Paris,
    description: 'Description',
    bedrooms: 2,
    goods: [],
    host: {
      id: 1,
      name: 'John',
      avatarUrl: 'path/to/avatar.jpg',
      isPro: false
    },
    images: [],
    maxAdults: 1,
  },
  isOfferDataLoading: LoadingStatus.Success,
};

const mockFavoritesState: FavoritesState = {
  favorites: [],
  isFavoritesDataLoading: LoadingStatus.Success,
};

const mockCommentsState: CommentsState = {
  comments: [],
  isCommentsDataLoading: LoadingStatus.Success,
};

const mockCityState: CityState = {
  city: CITIES.Paris
};

export const makeFakeStore = (initialState?: Partial<FullState>): FullState => ({
  User: mockUserState,
  Offers: mockOffersState,
  Offer: mockOfferState,
  Favorites: mockFavoritesState,
  Comments: mockCommentsState,
  City: mockCityState,
  ...initialState ?? [],
});
