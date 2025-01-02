import { LoadingStatus } from '../../../recources/loading-status';
import { CardProps } from '../../../recources/types';
import { setFavorites, setFavoritesLoadingStatus } from '../../actions';
import { favoritesReducer } from '../favorites-reducer';


describe('favoritesReducer', () => {
  const initialState = {
    favorites: [],
    isFavoritesDataLoading: LoadingStatus.Init,
  };

  it('should return the initial state by default', () => {
    expect(favoritesReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle loadFavorites action', () => {
    const favorites: CardProps[] = [
      {
        id: 1,
        title: 'Test Place',
        type: 'Apartment',
        previewImage: 'img/src2.jpg',
        price: 100,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
            zoom: 12
          }
        },
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 12
        },
        isFavorite: true,
        isPremium: false,
        rating: 5,
      },
    ];
    expect(favoritesReducer(initialState, setFavorites(favorites))).toEqual({
      ...initialState,
      favorites,
    });
  });

  it('should handle setFavoritesLoadingStatus action', () => {
    expect(favoritesReducer(initialState, setFavoritesLoadingStatus(LoadingStatus.Pending))).toEqual({
      ...initialState,
      isFavoritesDataLoading: LoadingStatus.Pending,
    });
  });
});
