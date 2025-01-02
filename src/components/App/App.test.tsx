import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app.tsx';
import { AppRoute } from '../../recources/routes.ts';
import { withHistory, withStore } from '../../recources/mock-component.tsx';
import { makeFakeStore } from '../../recources/mock.ts';
import { CITIES } from '../../recources/cities.ts';
import { LoadingStatus } from '../../recources/loading-status.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);
    const { container } = render(withStoreComponent);

    const mainPageContainer = container.querySelector('.page--main');
    expect(mainPageContainer).toBeInTheDocument();
  });


  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    mockHistory.push(AppRoute.Login);
    const { container } = render(withStoreComponent);

    const loginPageContainer = container.querySelector('.page--login');
    expect(loginPageContainer).toBeInTheDocument();
  });


  it('should render "MainPage" when authorized user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: true,
          userData: {
            id: 1,
            name: 'John',
            avatarUrl: 'path/to/avatar.jpg',
            isPro: false,
            email: 'abc@def.gh',
            token: 'AAAAA'
          }
        }
      }
    ));
    mockHistory.push(AppRoute.Login);
    const { container } = render(withStoreComponent);

    const mainPageContainer = container.querySelector('.page--main');
    expect(mainPageContainer).toBeInTheDocument();

    const loginPageContainer = container.querySelector('.page--login');
    expect(loginPageContainer).toBeNull();
  });


  it('should render Spinner on MainPage when LoadingStatus is Pending', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        Offers: {
          isOffersDataLoading: LoadingStatus.Pending,
          offers: [],
          nearbyOffers: [],
        }
      }
    ));
    mockHistory.push(AppRoute.Main);
    const { container } = render(withStoreComponent);

    const offersListContainer = container.querySelector('.places__list');
    expect(offersListContainer).toBeNull();

    const spinnerContainer = container.querySelector('.spin-container');
    expect(spinnerContainer).toBeInTheDocument();
  });


  it('should render "LoginPage" when authorizationStatus is true', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: true,
          userData: {
            id: 1,
            name: 'John',
            avatarUrl: 'path/to/avatar.jpg',
            isPro: false,
            email: 'abc@def.gh',
            token: 'AAAAA'
          }
        }
      }
    ));
    mockHistory.push(AppRoute.Favorites);
    const { container } = render(withStoreComponent);

    const favoritesPageContainer = container.querySelector('.page__favorites-container');
    expect(favoritesPageContainer).toBeInTheDocument();
  });


  it('should render "LoginPage" when auth status is authorizationStatus is false and route to Favourite Page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: false,
          userData: null
        }
      }
    ));
    mockHistory.push(AppRoute.Favorites);
    const { container } = render(withStoreComponent);

    const favoritesPageContainer = container.querySelector('.page__favorites-container');
    expect(favoritesPageContainer).toBeNull();

    const loginPageContainer = container.querySelector('.page--login');
    expect(loginPageContainer).toBeInTheDocument();
  });


  it('should render "OfferPage" with the correct name', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const expectedOfferId = 2;
    const expectedOfferName = 'TestTitle';

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        Offer: {
          offer: {
            id: expectedOfferId,
            title: expectedOfferName,
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
        }
      }
    ));
    mockHistory.push(`/offer/${expectedOfferId}`);
    const { container } = render(withStoreComponent);

    const pageContainer = container.querySelector('.page');
    expect(pageContainer).toBeInTheDocument();

    const offerContainer = pageContainer?.querySelector('.offer');
    expect(offerContainer).toBeInTheDocument();

    const offerNameContainer = pageContainer?.querySelector('.offer__name');
    expect(offerNameContainer).toHaveTextContent(expectedOfferName);

    const nearPLacesContainer = pageContainer?.querySelector('.container');
    expect(nearPLacesContainer).toBeInTheDocument();

  });


  it('should render "NotFoundPage" when route is incorrect', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/wrongRoute');
    render(withStoreComponent);

    const expectedText = 'This page does not (yet) exist';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
