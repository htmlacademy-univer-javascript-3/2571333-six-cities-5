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
}

export type User = {
  name: string;
  avatarUrl: string;
}

export type authData = {
  email: string;
  password: string;
}

export type UserData = User & {
  email: string;
  token: string;
}

export type HostUser = User & {
  isPro: boolean;
}

export type FullOfferInfo = CardProps & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostUser;
  images: string[];
  maxAdults: number;
};
