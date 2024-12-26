import React, { ChangeEvent } from 'react';
import { useState } from 'react';

export type ReviewFormState = {
  comment: string;
  numberOfStars: number;
}

function ReviewForm(): JSX.Element {
  const [savedReview, setSavedReview] = useState<ReviewFormState | null>(null);
  const starsList: number[] = [5, 4, 3, 2, 1];
  const starsMeanings: string[] = ['perfect', 'good', 'not bad', 'badly', 'terrible'];

  function SaveReviewState(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    let tempComment: string = '';
    let tempNumberOfStars: number = 0;

    if (savedReview !== null) {
      tempComment = savedReview.comment;
      tempNumberOfStars = savedReview.numberOfStars;
    }
    if (name === 'rating') {
      tempNumberOfStars = Number(value);
    }
    if (name === 'review') {
      tempComment = value;
    }

    if (tempComment === '' && tempNumberOfStars === 0) {
      setSavedReview(null);
    } else {
      setSavedReview({ comment: tempComment, numberOfStars: tempNumberOfStars });
    }
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starsList.map((number) => (
            <React.Fragment
              key={number}
            >
              <input className="form__rating-input visually-hidden" name="rating" value={`${number}`} id={`${number}-stars`} type="radio" onChange={SaveReviewState} />
              <label htmlFor={`${number}-stars`} className="reviews__rating-label form__rating-label" title={`${starsMeanings[number - 1]}`}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={SaveReviewState} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={savedReview === null || savedReview !== null && savedReview?.comment.length < 50 || savedReview?.numberOfStars === 0}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
