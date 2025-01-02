import { useAppSelector } from '../../hooks/use-app-selector';
import { ActionTypes } from '../../recources/action-types';
import Review, { ReviewProps } from '../Review/review';
import ReviewForm from '../ReviewForm/review-form';

export type ReviewBlockProps = {
  numberOfReviews: number;
  postedReviews: ReviewProps[];
}

function ReviewBlock({ numberOfReviews, postedReviews }: ReviewBlockProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{numberOfReviews}</span></h2>
      <ul className="reviews__list">
        {
          postedReviews.map((review) => (
            <Review key={review.id} id={review.id} user={review.user} rating={review.rating} comment={review.comment} date={review.date} />
          ))
        }
      </ul>
      {isAuthorized ? <ReviewForm /> : null}
    </section>
  );
}

export default ReviewBlock;
