import classNames from 'classnames';
import { CardProps } from '../../recources/Types';
import Card from '../Card/Card';


export type OfferListProps = {
    listOfOffers: CardProps[];
    onOfferHover: (hoveredCard: CardProps | undefined) => void;
    isNearPlaces?: boolean;
}

function OfferList({ listOfOffers, onOfferHover, isNearPlaces = false}: OfferListProps): JSX.Element {
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
              isNearPlaces={isNearPlaces}
            />
          </div>
        ))
      }
    </div>
  );
}

export default OfferList;
