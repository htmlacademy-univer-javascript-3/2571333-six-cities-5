import Card, { CardProps } from '../Card/Card';

export type OfferListProps = {
    listOfOffers: CardProps[];
    onOfferHover: (hoveredCard: CardProps | null) => void;
}

function OfferList({ listOfOffers, onOfferHover }: OfferListProps): JSX.Element {
    return (
        <div className="cities__places-list places__list tabs__content">
            {
                listOfOffers.map((card) => (
                    <div
                        onMouseOver={() => onOfferHover(card)}
                        onMouseLeave={() => onOfferHover(null)}
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
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default OfferList;
