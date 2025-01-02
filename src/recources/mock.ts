import { Action } from 'redux';
import { FullState } from '../store/reducer';
import { CITIES } from './cities';
import { UserState } from '../store/reducers/user-reducer';
import { OffersState } from '../store/reducers/offers-reducer';
import { LoadingStatus } from './loading-status';
import { OfferState } from '../store/reducers/offer-reducer';
import { FavoritesState } from '../store/reducers/favorites-reducer';
import { CommentsState } from '../store/reducers/comments-reducer';
import { CityState } from '../store/reducers/city-reducer';

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
