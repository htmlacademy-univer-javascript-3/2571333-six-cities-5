import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createAPI } from '../api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../hooks/use-app-selector.ts';
import { Action } from '@reduxjs/toolkit';
import { ActionTypes } from '../recources/action-types.ts';
import App from '../components/App/app.tsx';
import { LoadingStatus } from '../recources/loading-status.ts';
import { AppRoute } from '../recources/routes.ts';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
const initActionsStore = () => {
  const axios = createAPI();
  const mockAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  return { mockAxios, mockStoreCreator };
};


const { mockStoreCreator } = initActionsStore();

describe('App Routing', () => {
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [ActionTypes.USER]: {
        authorizationStatus: false,
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
        isOffersDataLoading: LoadingStatus.Success,
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
        isOfferDataLoading: LoadingStatus.Success,
      },
      [ActionTypes.COMMENTS]: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Success
      },
      [ActionTypes.FAVORITES]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success
      },
    });
  });

  it('should render Main page for "/" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Main]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login page for "/login" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Login]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render Favorites page for "/favorites" route if authorized', () => {
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

    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Favorites]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render Offer page for "/offer/:id" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Offer.replace(':id', '1')]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render NotFound page for unknown route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={['/unknown-route']} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
