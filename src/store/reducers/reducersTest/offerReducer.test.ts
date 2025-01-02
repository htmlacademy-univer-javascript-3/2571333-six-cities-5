import { LoadingStatus } from '../../../recources/LoadingStatus';
import { FullOfferInfo } from '../../../recources/Types';
import { clearOffer, setOffer } from '../../actions';
import { offerReducer } from '../offerReducer';

describe('offerReducer', () => {
  const initialState = {
    isOfferDataLoading: LoadingStatus.Init,
  };

  const testOffer: FullOfferInfo = {
    id: 1,
    title: 'Test Offer',
    type: 'Apartment',
    price: 150,
    previewImage: '/img/test.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A great place to stay',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Air conditioning', 'Kitchen'],
    host: {
      id: 1,
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: true,
    },
    images: ['/img/room1.jpg', '/img/room2.jpg'],
    maxAdults: 4,
  };

  it('should return the initial state by default', () => {
    expect(offerReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle clearOffer action', () => {
    expect(
      offerReducer({ ...initialState, offer: testOffer }, clearOffer())
    ).toEqual(initialState);
  });

  it('should handle loadOffer action', () => {
    const offer: FullOfferInfo = {
      id: 1,
      title: 'Test Offer',
      type: 'Apartment',
      price: 150,
      previewImage: '/img/test.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.8,
      description: 'A great place to stay',
      bedrooms: 2,
      goods: ['Wi-Fi', 'Air conditioning', 'Kitchen'],
      host: {
        id: 1,
        name: 'John Doe',
        avatarUrl: '/img/avatar.jpg',
        isPro: true,
      },
      images: ['/img/room1.jpg', '/img/room2.jpg'],
      maxAdults: 4,
    };

    expect(offerReducer(initialState, setOffer(testOffer))).toEqual({
      ...initialState,
      offer,
    });
  });
});
