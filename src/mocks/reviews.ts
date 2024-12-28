import { ReviewProps } from '../components/Review/Review';
import { OfferPageProps } from '../pages/OfferPage/OfferPage';
import { CITIES } from '../recources/Cities';
import { User } from '../recources/Types';
import { mockOffers } from '../mocks/offers';

export const mockMaxUser: User = {
  name: 'Max',
  avatarPath: 'img/avatar-max.jpg'
};

export const mockMaxFirstReview: ReviewProps = {
  id: 1,
  user: mockMaxUser,
  reviewRating: 80,
  reviewText: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.'
};

export const mockReviewList: ReviewProps[] = [mockMaxFirstReview];

export const mockFirstOfferReview: OfferPageProps = {
  city: CITIES.Amsterdam,
  proxyCards: mockOffers,
  numberOfReviews: 1,
  postedReviews: mockReviewList
};

export const mockOfferReviewsList: OfferPageProps[] = [mockFirstOfferReview];
