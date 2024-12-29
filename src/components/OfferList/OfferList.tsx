import classNames from 'classnames';
import { CardProps } from '../../recources/Types';
import Card from '../Card/Card';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { changeFavorite } from '../../store/actionsAPI';


export type OfferListProps = {
  listOfOffers: CardProps[];
  onOfferHover: (hoveredCard: CardProps | undefined) => void;
  isNearPlaces?: boolean;
  offerPageId?: string;
}

function OfferList({ listOfOffers, onOfferHover, isNearPlaces = false, offerPageId = undefined }: OfferListProps): JSX.Element {
  
  const UseAppDispatchLocalUsage = useAppDispatch();
  function changeToFavorites(id: string, isFavorite: boolean): void {
    if (offerPageId) {
      UseAppDispatchLocalUsage(changeFavorite(
        {
          offerId: String(id),
          favoriteStatus: !isFavorite,
          offerPageId: offerPageId
        }
      ))
    } else {
      UseAppDispatchLocalUsage(changeFavorite(
        {
          offerId: String(id),
          favoriteStatus: !isFavorite
        }
      ))
    }
  }

  return (
    <div className={classNames(isNearPlaces ? 'near-places__list' : 'cities__places-list', 'places__list', !isNearPlaces && 'tabs__content')}>
      {
        listOfOffers.map((card) => (
          <div
            onMouseOver={() => onOfferHover(card)}
            onMouseLeave={() => onOfferHover(undefined)}
            key={card.id}
          >
            <Card
              id={card.id}
              title={card.title}
              type={card.type}
              previewImage={card.previewImage}
              price={card.price}
              rating={card.rating}
              isPremium={card.isPremium}
              isFavorite={card.isFavorite}
              location={card.location}
              city={card.city}
              isNearPlaces={isNearPlaces}
              onFavoriteClick={changeToFavorites}
            />
          </div>
        ))
      }
    </div>
  );
}

export default OfferList;
