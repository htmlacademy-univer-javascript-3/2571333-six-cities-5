import { useEffect, useMemo, useState } from 'react';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { CardProps } from '../../recources/types';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { CityList } from '../../components/city-list/city-list';
import PlacesSorter from '../../components/places-sorter/places-sorter';
import { SortOptions } from '../../recources/sort-options';
import PageHeader from '../../components/page-header/page-header';
import { setOffersLoadingStatus } from '../../store/actions';
import { LoadingStatus } from '../../recources/loading-status';
import { ActionTypes } from '../../recources/action-types';
import MainEmpty from '../../components/main-empty/main-empty';
import Spinner from '../../components/spinner/spinner';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<CardProps | undefined>(undefined);
  const [currentSorting, setCurrentSorting] = useState<SortOptions>(SortOptions.POPULAR);

  const currrentCity = useAppSelector((state) => state[ActionTypes.CITY].city);
  const currentOffers = useAppSelector((state) => state[ActionTypes.OFFERS].offers);
  const currentlyLoading = useAppSelector((state) => state[ActionTypes.OFFERS].isOffersDataLoading);

  function onOfferHover(hoveredCard: CardProps | undefined): void {
    setActiveCard(hoveredCard);
  }

  const onSortingChange = (sorting: SortOptions) => {
    setCurrentSorting(sorting);
  };

  const UseAppDispatchLocalUsage = useAppDispatch();

  const currentCityOffers = useMemo(() => currentOffers.filter((offer) => offer.city.name === currrentCity.name), [currentOffers, currrentCity]);

  const sortedOffers = useMemo(() => {
    switch (currentSorting) {
      case SortOptions.TOP_RATED:
        return currentCityOffers.toSorted((a, b) => b.rating - a.rating);
      case SortOptions.HIGH_TO_LOW:
        return currentCityOffers.toSorted((a, b) => b.price - a.price);
      case SortOptions.LOW_TO_HIGH:
        return currentCityOffers.toSorted((a, b) => a.price - b.price);
      default:
        return currentCityOffers;
    }
  }, [currentCityOffers, currentSorting]);


  useEffect(() => {
    if (!currentlyLoading) {
      return;
    }
    UseAppDispatchLocalUsage(setOffersLoadingStatus(currentlyLoading));

  }, [UseAppDispatchLocalUsage, currentlyLoading]);

  const cityListMemo = useMemo(() => <CityList />, []);

  const placesSorterMemo = useMemo(() => <PlacesSorter currentSorting={currentSorting} onSortingChange={onSortingChange} />, [currentSorting]);

  const offerListMemo = useMemo(() => <OfferList listOfOffers={sortedOffers} onOfferHover={onOfferHover} />, [sortedOffers]);

  return (
    <div className="page page--gray page--main">
      <PageHeader />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {cityListMemo}
          </section>
        </div>
        {currentlyLoading === LoadingStatus.Failure ?
          <MainEmpty city={currrentCity}/>
          :
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCityOffers.length} places to stay in {currrentCity.name}</b>
                {placesSorterMemo}
                {currentlyLoading !== LoadingStatus.Success ? <Spinner /> : offerListMemo}
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={currrentCity} points={currentCityOffers} selectedPoint={activeCard} />
                </section>
              </div>
            </div>
          </div>}
      </main>
    </div>
  );
}

export default MainPage;
