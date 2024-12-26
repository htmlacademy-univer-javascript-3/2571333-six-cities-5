import { MapCoordinates } from '../components/Map/Map';

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
  }
