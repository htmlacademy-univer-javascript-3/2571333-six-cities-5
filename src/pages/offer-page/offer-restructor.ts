import { CardProps, FullOfferInfo } from '../../recources/types';

export const convertToOffer = (offerFull: FullOfferInfo): CardProps => {
  const {
    id,
    title,
    type,
    previewImage,
    price,
    rating,
    city,
    location,
    isFavorite,
    isPremium,
  } = offerFull;

  return {
    id,
    title,
    type,
    previewImage,
    price,
    rating,
    city,
    location,
    isFavorite,
    isPremium,
  };
};
