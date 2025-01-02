import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/mock-component';
import { makeFakeStore } from '../../recources/mock';
import OfferList from './offer-list';
import { CITIES } from '../../recources/cities';

describe('Offer List tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  function onOfferHover(): void {

  }

  it('should render list', () => {
    const testOffersList = [
      {
        id: 1,
        title: 'Title1',
        type: 'Appartment',
        previewImage: 'path/to/image.jpg',
        price: 11,
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
      {
        id: 2,
        title: 'Title2',
        type: 'Appartment',
        previewImage: 'path/to/image.jpg',
        price: 12,
        rating: 1,
        isPremium: false,
        isFavorite: false,
        location: {
          latitude: 10,
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
      }];
    const withHistoryComponent = withHistory(<OfferList listOfOffers={testOffersList} onOfferHover={onOfferHover}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const listContainer = container.querySelector('.places__list');
    expect(listContainer).toBeInTheDocument();
  });

  it('should have all offers from list by title', () => {
    const testOffersList = [
      {
        id: 1,
        title: 'Title1',
        type: 'Appartment',
        previewImage: 'path/to/image.jpg',
        price: 11,
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
      {
        id: 2,
        title: 'Title2',
        type: 'Appartment',
        previewImage: 'path/to/image.jpg',
        price: 12,
        rating: 1,
        isPremium: false,
        isFavorite: false,
        location: {
          latitude: 10,
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
      }];
    const withHistoryComponent = withHistory(<OfferList listOfOffers={testOffersList} onOfferHover={onOfferHover}/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const listContainer = container.querySelector('.places__list');
    expect(listContainer).toBeInTheDocument();

    const cardNameContainer = listContainer ? Array.from(listContainer?.querySelectorAll('.place-card__name')) : [];
    expect(cardNameContainer[0]).toBeInTheDocument();
    expect(cardNameContainer[1]).toBeInTheDocument();

    const cardNamLinkFirstContainer = cardNameContainer[0]?.querySelector('a');
    expect(cardNamLinkFirstContainer).toHaveTextContent(testOffersList[0].title);

    const cardNamLinkSecondContainer = cardNameContainer[1]?.querySelector('a');
    expect(cardNamLinkSecondContainer).toHaveTextContent(testOffersList[1].title);
  });
});
