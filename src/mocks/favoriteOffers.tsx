import { CardProps } from "../recources/Types";

export const favoriteOffers: CardProps[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    isPremium: true,
    isFavorite: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    }
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 100,
    isPremium: true,
    isFavorite: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    }
  }
];
