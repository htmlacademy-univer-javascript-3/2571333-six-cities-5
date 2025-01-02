import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../recources/MockComponent';
import { makeFakeStore } from '../../recources/Mock';
import OffersOnCities from './OffersOnCities';
import { LoadingStatus } from '../../recources/LoadingStatus';
import { CITIES } from '../../recources/Cities';

describe('Offers on Cities tests', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render favorites list', () => {
    const withHistoryComponent = withHistory(<OffersOnCities />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const { container } = render(withStoreComponent);

    const favoritesContanier = container.querySelector('.favorites__list');
    expect(favoritesContanier).toBeInTheDocument();
  });

  it('should render all cities from favorites', () => {
    const withHistoryComponent = withHistory(<OffersOnCities />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        Favorites: {
          isFavoritesDataLoading: LoadingStatus.Success,
          favorites: [{
            id: 1,
            title: 'AmsterdamTest',
            type: 'Appartment',
            previewImage: 'path/to/image.jpg',
            price: 100,
            rating: 5,
            isPremium: false,
            isFavorite: false,
            location: {
              latitude: 10,
              longitude: 10,
              zoom: 10
            },
            city: CITIES.Amsterdam,
          },
          {
            id: 2,
            title: 'ParisTest',
            type: 'Appartment',
            previewImage: 'path/to/image.jpg',
            price: 100,
            rating: 5,
            isPremium: false,
            isFavorite: false,
            location: {
              latitude: 10,
              longitude: 10,
              zoom: 10
            },
            city: CITIES.Paris,
          }]
        }
      }
    ));
    const { container } = render(withStoreComponent);

    const favoritesContanier = container.querySelector('.favorites__list');
    expect(favoritesContanier).toBeInTheDocument();

    const favoritesCitiesContainers = favoritesContanier ? Array.from(favoritesContanier?.querySelectorAll('.favorites__locations-items')) : [];
    expect(favoritesCitiesContainers[0]).toBeInTheDocument();
    expect(favoritesCitiesContainers[1]).toBeInTheDocument();

    const favoritesCityFirstContainer = favoritesCitiesContainers[0]?.querySelector('span');
    expect(favoritesCityFirstContainer).toHaveTextContent(CITIES.Amsterdam.name);

    const favoritesCitySecondContainer = favoritesCitiesContainers[1]?.querySelector('span');
    expect(favoritesCitySecondContainer).toHaveTextContent(CITIES.Paris.name);
  });
});
