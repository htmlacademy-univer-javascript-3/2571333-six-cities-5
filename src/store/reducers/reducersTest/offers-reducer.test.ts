import { LoadingStatus } from '../../../recources/loading-status';
import { CardProps } from '../../../recources/types';
import { clearNearbyOffers, fillOffers, setNearbyOffers, setOffersLoadingStatus } from '../../actions';
import { offersReducer } from '../offers-reducer';


describe('offersReducer', () => {
  const initialState = {
    offers: [],
    nearbyOffers: [],
    isOffersDataLoading: LoadingStatus.Init,
  };

  const mockOffers: CardProps[] = [
    {
      id: 1,
      title: 'Test Offer',
      type: 'Apartment',
      price: 100,
      previewImage: '/img/test1.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Test Offer - 2',
      type: 'Apartment',
      price: 100,
      previewImage: '/img/test2.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
    }
  ];

  it('should return the initial state by default', () => {
    expect(offersReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle getOffers action', () => {
    expect(offersReducer(initialState, fillOffers(mockOffers))).toEqual({
      ...initialState,
      offers: mockOffers,
    });
  });

  it('should handle setNearbyOffers action', () => {
    expect(offersReducer(initialState, setNearbyOffers(mockOffers))).toEqual({
      ...initialState,
      nearbyOffers: mockOffers,
    });
  });

  it('should handle clearNearbyOffers action', () => {
    const stateWithNearOffers = {
      ...initialState,
      nearbyOffers: mockOffers,
      isOffersDataLoading: LoadingStatus.Pending,
    };

    expect(offersReducer(stateWithNearOffers, clearNearbyOffers())).toEqual({
      ...initialState,
      nearbyOffers: [],
      isOffersDataLoading: LoadingStatus.Success,
    });
  });

  it('should handle setOffersLoadingStatus action', () => {
    expect(
      offersReducer(initialState, setOffersLoadingStatus(LoadingStatus.Pending))
    ).toEqual({
      ...initialState,
      isOffersDataLoading: LoadingStatus.Pending,
    });
  });
});
