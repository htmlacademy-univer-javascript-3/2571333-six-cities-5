import { Link } from 'react-router-dom';
import { CardProps } from '../../recources/Types';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ActionTypes } from '../../recources/ActionTypes';
import { AppRoute } from '../../recources/Routes';
import { useMemo } from 'react';

function Card({ id, title, type, previewImage, price, rating, isPremium, isFavorite, isNearPlaces, onFavoriteClick }: CardProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);

  const nestedTernary = useMemo(() => {
    if (!isAuthorized) {
      return (
        <Link className="place-card__bookmark-button button" type="button" to={AppRoute.Login}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </Link>
      );
    } else {
      if (isFavorite) {
        return (
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={() => onFavoriteClick?.(String(id), isFavorite)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        );
      } else {
        return (
          <button className="place-card__bookmark-button button" type="button" onClick={() => onFavoriteClick?.(String(id), isFavorite)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        );
      }
    }
  }, [id, isAuthorized, isFavorite, onFavoriteClick]);

  return (
    <article id={id.toString()} className={classNames(isNearPlaces ? 'near-places__card' : 'cities__card', 'place-card')}>

      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null}

      <div className={classNames(isNearPlaces ? 'near-places__image-wrapper' : 'cities__image-wrapper', 'place-card__image-wrapper')}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {nestedTernary}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ 'width': `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
