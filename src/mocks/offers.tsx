import { CardProps } from '../components/Card/Card';

export const offers: CardProps[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    isPremium: true,
    isFavorite: false
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Room',
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 80,
    isPremium: false,
    isFavorite: true
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 80,
    isPremium: false,
    isFavorite: false
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 100,
    isPremium: true,
    isFavorite: false
  }
];
