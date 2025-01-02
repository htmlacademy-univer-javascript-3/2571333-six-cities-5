import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { createAPI } from '../../api';
import { ActionTypes } from '../../recources/action-types';
import { LoadingStatus } from '../../recources/loading-status';
import { changeFavorite, createComment, fetchComments, fetchFavorites, fetchOffers, fetchOffersNearby, fetchOneOffer, userCheckAuth, userLogin, userLogout } from '../actionsAPI';
import { State } from '../../hooks/use-app-selector';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const initActionsStore = () => {
  const axios = createAPI();
  const mockAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  return { mockAxios, mockStoreCreator };
};

const { mockAxios, mockStoreCreator } = initActionsStore();

describe('Async actions', () => {
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [ActionTypes.USER]: {
        authorizationStatus: true,
        userData: {
          id: 1,
          name: 'Nick Locks',
          avatarUrl: '/img/avatar.jpg',
          isPro: false,
          email: 'locks@example.com',
          token: 'testToken123',
        },
      },
      [ActionTypes.CITY]: {
        city: {
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
        },
      },
      [ActionTypes.OFFERS]: {
        offers: [],
        nearbyOffers: [],
        isOffersDataLoading: LoadingStatus.Init,
      },
      [ActionTypes.OFFER]: {
        activeOffer: '1',
        offer: {
          id: 1,
          title: 'Test Offer',
          type: 'Apartment',
          price: 100,
          isFavorite: false,
          isPremium: true,
          rating: 4.5,
          city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
          description: 'description',
          bedrooms: 2,
          goods: ['window'],
          host: {
            id: 1,
            name: 'John',
            avatarUrl: 'img/src1.jpg',
            isPro: false
          },
          previewImage: 'img/src1.jpg',
          images: ['img/src1.jpg'],
          maxAdults: 2
        },
        isOfferDataLoading: LoadingStatus.Init,
      },
      [ActionTypes.COMMENTS]: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Init
      },
      [ActionTypes.FAVORITES]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Init
      },
    });
    mockAxios.reset();
  });

  it('should dispatch setUserData and setAuthorizationStatus on successful userLogin', async () => {
    const mockUserData = {
      id: 1,
      name: 'Nick Locks',
      avatarUrl: '/img/avatar.jpg',
      isPro: false,
      email: 'locks@example.com',
      token: 'testToken123',
    };

    mockAxios.onPost('/login').reply(201, mockUserData);

    await store.dispatch(userLogin({ email: 'john.doe@example.com', password: 'password123' }));

    const actions = store.getActions();

    expect(actions).toEqual([
      expect.objectContaining({ type: 'User/login/pending' }),
      { type: 'User/authorization', payload: true },
      { type: 'User/setData', payload: mockUserData },
      expect.objectContaining({ type: 'User/login/fulfilled' }),
    ]);
  });


  it('should dispatch clearUserData and setAuthorizationStatus(false) on userLogout', async () => {
    mockAxios.onDelete('/logout').reply(204);

    await store.dispatch(userLogout());

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'User/logout/pending' }),
      { type: 'User/authorization', payload: false },
      { type: 'User/clear' },
      expect.objectContaining({ type: 'User/logout/fulfilled' }),
    ]);
  });

  it('should dispatch setUserData and setAuthorizationStatus(true) on successful userCheckAuth', async () => {
    const mockUserData = {
      id: 1,
      name: 'Nick Locks',
      avatarUrl: '/img/avatar.jpg',
      isPro: false,
      email: 'locks@example.com',
      token: 'testToken123',
    };

    mockAxios.onGet('/login').reply(200, mockUserData);

    await store.dispatch(userCheckAuth());

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'User/login/pending' }),
      { type: 'User/authorization', payload: true },
      { type: 'User/setData', payload: mockUserData },
      expect.objectContaining({ type: 'User/login/fulfilled' }),
    ]);
  });

  it('should dispatch getOffers and setOffersLoadingStatus on fetchOffers', async () => {
    const mockOffers = [
      {
        id: '1',
        title: 'Mock Offer',
        type: 'apartment',
        price: 100,
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
    ];
    mockAxios.onGet('/offers').reply(200, mockOffers);

    await store.dispatch(fetchOffers());

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Offers/fetch/pending' }),
      { type: 'Offers/loading', payload: LoadingStatus.Pending },
      { type: 'Offers/fill', payload: mockOffers },
      { type: 'Offers/loading', payload: LoadingStatus.Success },
      expect.objectContaining({ type: 'Offers/fetch/fulfilled' }),
    ]);
  });

  it('should dispatch setOffer and setOfferLoadingStatus on fetchOffer', async () => {
    const mockOffer = {
      id: '1',
      title: 'Mock Offer',
      type: 'apartment',
      price: 100,
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
      location: { latitude: 48.8566, longitude: 2.3522 },
    };
    mockAxios.onGet('/offers/1').reply(200, mockOffer);

    await store.dispatch(fetchOneOffer('1'));

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Offer/fetch/pending' }),
      { type: 'Offer/loading', payload: LoadingStatus.Pending },
      { type: 'Offer/set', payload: mockOffer },
      { type: 'Offer/loading', payload: LoadingStatus.Success },
      expect.objectContaining({ type: 'Offer/fetch/fulfilled' }),
    ]);
  });

  it('should dispatch setNearOffers on fetchOffersNearby', async () => {
    const mockNearbyOffers = [
      {
        id: '2',
        title: 'Nearby Offer',
        type: 'room',
        price: 80,
        isFavorite: false,
        isPremium: false,
        rating: 4.0,
        city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
        location: { latitude: 48.8566, longitude: 2.3522 },
      },
    ];
    mockAxios.onGet('/offers/1/nearby').reply(200, mockNearbyOffers);

    await store.dispatch(fetchOffersNearby('1'));

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Offers/nearby/pending' }),
      { type: 'Offers/loading', payload: LoadingStatus.Pending },
      { type: 'Offers/nearby', payload: mockNearbyOffers },
      { type: 'Offers/loading', payload: LoadingStatus.Success },
      expect.objectContaining({ type: 'Offers/nearby/fulfilled' }),
    ]);
  });

  it('should dispatch setComments and setCommentsLoadingStatus on fetchComments', async () => {
    const mockComments = [
      {
        id: 1,
        date: '2023-10-01T12:34:56Z',
        user: { name: 'John Doe', avatarUrl: '/img/avatar.jpg', isPro: false },
        comment: 'Great place!',
        rating: 5,
      },
    ];
    mockAxios.onGet('/comments/1').reply(200, mockComments);

    await store.dispatch(fetchComments('1'));

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Comments/fetch/pending' }),
      { type: 'Comments/loading', payload: LoadingStatus.Pending },
      { type: 'Comments/set', payload: mockComments },
      { type: 'Comments/loading', payload: LoadingStatus.Success },
      expect.objectContaining({ type: 'Comments/fetch/fulfilled' }),
    ]);
  });

  it('should handle createComment by dispatching fetchComments on success when offer matches', async () => {
    const mockForm = {
      rating: 5,
      comment: 'Great place!',
    };

    mockAxios.onPost('/comments/1').reply(201);

    await store.dispatch(createComment({ offerId: '1', form: mockForm }));

    const actions = store.getActions();

    expect(actions).toEqual([
      expect.objectContaining({ type: 'Comments/create/pending' }),
      expect.objectContaining({ type: 'Comments/fetch/pending' }),
      { type: 'Comments/loading', payload: 'Pending' },
      expect.objectContaining({ type: 'Comments/create/fulfilled' }),
    ]);
  });

  it('should not dispatch fetchComments if offer ID does not match', async () => {
    const mockForm = {
      id: 1,
      user: {
        id: 1,
        name: 'Nick Locks',
        avatarUrl: '/img/avatar.jpg',
        isPro: false
      },
      rating: 5,
      comment: 'Great place!',
      date: '2023-10-01T12:34:56Z',
    };

    mockAxios.onPost('/comments/2').reply(201);

    await store.dispatch(createComment({ offerId: '2', form: mockForm }));

    const actions = store.getActions();

    expect(actions).toEqual([
      expect.objectContaining({ type: 'Comments/create/pending' }),
      expect.objectContaining({ type: 'Comments/create/fulfilled' }),
    ]);

    expect(actions).not.toContainEqual(expect.objectContaining({ type: 'Comments/fetch/pending' }));
  });


  it('should dispatch setFavorites and setFavoritesLoadingStatus on fetchFavorites', async () => {
    const mockFavorites = [
      {
        id: '1',
        title: 'Favorite Offer',
        type: 'house',
        price: 200,
        isFavorite: true,
        isPremium: true,
        rating: 4.8,
        city: { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041 } },
        location: { latitude: 52.3676, longitude: 4.9041 },
      },
    ];
    mockAxios.onGet('/favorite').reply(200, mockFavorites);

    await store.dispatch(fetchFavorites());

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Favorites/fetch/pending' }),
      { type: 'Favorites/loading', payload: LoadingStatus.Pending },
      { type: 'Favorites/fill', payload: mockFavorites },
      { type: 'Favorites/loading', payload: LoadingStatus.Success },
      expect.objectContaining({ type: 'Favorites/fetch/fulfilled' }),
    ]);
  });

  it('should handle changeFavorite by dispatching fetchFavorites and fetchOffers', async () => {
    mockAxios.onPost('/favorite/1/1').reply(200);

    await store.dispatch(changeFavorite({ offerId: '1', favoriteStatus: true }));

    const actions = store.getActions();
    expect(actions).toEqual([
      expect.objectContaining({ type: 'Favorites/change/pending' }),
      expect.objectContaining({ type: 'Favorites/fetch/pending' }),
      { type: 'Favorites/loading', payload: 'Pending' },
      expect.objectContaining({ type: 'Offers/fetch/pending' }),
      { type: 'Offers/loading', payload: 'Pending' },
      expect.objectContaining({ type: 'Favorites/change/fulfilled' })
    ]);
  });
});
