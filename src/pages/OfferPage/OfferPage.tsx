import { useEffect, useState } from 'react';
import OfferList from '../../components/OfferList/OfferList';
import ReviewBlock from '../../components/ReviewBlock/ReviewBlock';
import { CardProps } from '../../recources/Types';
import Map from '../../components/Map/Map';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import Spinner from '../../components/Spinner/Spinner';
import { LoadingStatus } from '../../recources/LoadingStatus';
import { useParams } from 'react-router-dom';
import { clearComments, clearNearbyOffers, clearOffer } from '../../store/actions';
import { fetchComments, fetchOffersNearby, fetchOneOffer } from '../../store/actionsAPI';
import { ActionTypes } from '../../recources/ActionTypes';

function OfferPage(): JSX.Element {
  const { id } = useParams();

  const [activeCard, setActiveCard] = useState<CardProps | undefined>(undefined);

  const userData = useAppSelector((state) => state[ActionTypes.USER].userData);
  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);
  const offer = useAppSelector((state) => state[ActionTypes.OFFER].offer);
  const isLoadingOneOfferLocalUsage = useAppSelector((state) => state[ActionTypes.OFFER].isOfferDataLoading);
  const postedReviews = useAppSelector((state) => state[ActionTypes.COMMENTS].comments);
  const isLoadingOfferCommentsLocalUsage = useAppSelector((state) => state[ActionTypes.COMMENTS].isCommentsDataLoading);
  const nearbyOffers = useAppSelector((state) => state[ActionTypes.OFFERS].nearbyOffers);
  const isLoadingOffers = useAppSelector((state) => state[ActionTypes.OFFERS].isOffersDataLoading);

  const UseAppDispatchLocalUsage = useAppDispatch();

  function onOfferHover(hoveredCard: CardProps | undefined): void {
    setActiveCard(hoveredCard);
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    UseAppDispatchLocalUsage(fetchOneOffer(id));

    return () => {
      UseAppDispatchLocalUsage(clearOffer());
    };
  }, [UseAppDispatchLocalUsage, id]);

  useEffect(() => {
    if (!id || !offer) {
      return;
    }
    UseAppDispatchLocalUsage(fetchOffersNearby(id));
    UseAppDispatchLocalUsage(fetchComments(id));

    return () => {
      UseAppDispatchLocalUsage(clearNearbyOffers());
      UseAppDispatchLocalUsage(clearComments());
    };
  }, [UseAppDispatchLocalUsage, id, offer]);

  return (
    <div className="page">
      <PageHeader isAuthorized={isAuthorized} userData={userData} />

      <main className="page__main page__main--offer">

        {isLoadingOneOfferLocalUsage !== LoadingStatus.Success || !offer ? (
          <Spinner />
        ) : (
          <>
            <section className="offer">
              <div className="offer__gallery-container container">
                <div className="offer__gallery">
                  {offer.images?.map((image) => (
                    <div className="offer__image-wrapper" key={image}>
                      <img className="offer__image" src={image} alt="Photo studio" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {offer.isPremium ?
                    (
                      <div className="offer__mark">
                        <span>Premium</span>
                      </div>)
                    : null}

                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">
                      {offer.title}
                    </h1>
                    {isAuthorized ?
                      (
                        <button className="offer__bookmark-button button" type="button">
                          <svg className="offer__bookmark-icon" width="31" height="33">
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>)
                      : null}
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <span style={{ width: `${offer.rating * 20}%` }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="offer__rating-value rating__value">{`${offer.rating}`}</span>
                  </div>

                  <ul className="offer__features">
                    <li className="offer__feature offer__feature--entire">
                      {offer.type}
                    </li>
                    <li className="offer__feature offer__feature--bedrooms">
                      {offer.bedrooms} Bedrooms
                    </li>
                    <li className="offer__feature offer__feature--adults">
                      Max {offer.maxAdults} adults
                    </li>
                  </ul>
                  <div className="offer__price">
                    <b className="offer__price-value">{offer.price}</b>
                    <span className="offer__price-text">&nbsp;night</span>
                  </div>
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">What&apos;s inside</h2>
                    <ul className="offer__inside-list">
                      {offer.goods.map((thing) => (
                        <li className="offer__inside-item" key={thing}>
                          {thing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="offer__host">
                    <h2 className="offer__host-title">Meet the host</h2>
                    <div className="offer__host-user user">
                      <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="offer__user-name">
                        {offer.host.name}
                      </span>
                      <span className="offer__user-status">
                        {offer.host.isPro ?
                          <span className="offer__user-status">Pro</span>
                          : null}
                      </span>
                    </div>
                    <div className="offer__description">
                      <p className="offer__text">
                        {offer.description}
                      </p>
                    </div>
                  </div>

                  {isLoadingOfferCommentsLocalUsage !== LoadingStatus.Success || !postedReviews ? (
                    <Spinner />
                  ) : (
                    <ReviewBlock numberOfReviews={postedReviews.length} postedReviews={postedReviews} />
                  )}
                </div>
              </div>
              <section className="offer__map map">
                <Map city={offer.city} points={nearbyOffers} selectedPoint={activeCard} />
              </section>
            </section>
            <div className="container">
              {isLoadingOffers !== LoadingStatus.Success || !nearbyOffers ? (
                <Spinner />
              ) : (
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <OfferList listOfOffers={nearbyOffers} onOfferHover={onOfferHover} isNearPlaces />
                </section>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default OfferPage;
