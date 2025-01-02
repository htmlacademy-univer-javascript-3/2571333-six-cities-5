import { City, MapCoordinates } from '../components/Map/Map';

export type CardProps = {
  id: number;
  title: string;
  type: string;
  previewImage: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  location: MapCoordinates;
  city: City;
  isNearPlaces?: boolean;
  onFavoriteClick?: (id: string, isFavorite: boolean) => void;
}

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type authData = {
  email: string;
  password: string;
}

export type UserData = User & {
  email: string;
  token: string;
}

export type FullOfferInfo = CardProps & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};