import { useAppSelector } from '../../hooks/useAppSelector';
import Review, { ReviewProps } from '../Review/Review';
import ReviewForm from '../ReviewForm/ReviewForm';

export type ReviewBlockProps = {
    numberOfReviews: number;
    postedReviews: ReviewProps[];
}

function ReviewBlock({ numberOfReviews, postedReviews }: ReviewBlockProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{numberOfReviews}</span></h2>
      <ul className="reviews__list">
        {
          postedReviews.map((review) => (
            <Review key={review.id} id={review.id} user={review.user} rating={review.rating} comment={review.comment} />
          ))
        }
      </ul>
      {isAuthorized ? <ReviewForm /> : null}
    </section>
  );
}

export default ReviewBlock;
