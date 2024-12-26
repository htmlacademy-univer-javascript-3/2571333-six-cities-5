import { CardProps } from '../../recources/Types';
import Card from '../Card/Card';


export type OfferListProps = {
    listOfOffers: CardProps[];
    onOfferHover: (hoveredCard: CardProps | undefined) => void;
}

function OfferList({ listOfOffers, onOfferHover }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
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
            />
          </div>
        ))
      }
    </div>
  );
}

export default OfferList;
