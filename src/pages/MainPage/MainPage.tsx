import { useEffect, useMemo, useState } from 'react';
import OfferList from '../../components/OfferList/OfferList';
import Map from '../../components/Map/Map';
import { CardProps } from '../../recources/Types';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { CityList } from '../../components/CityList/CityList';
import PlacesSorter from '../../components/PlacesSorter/PlacesSorter';
import { SortOptions } from '../../recources/SortOptions';
import Spinner from '../../components/Spinner/Spinner';
import PageHeader from '../../components/PageHeader/PageHeader';
import { setOffersLoadingStatus } from '../../store/actions';
import { LoadingStatus } from '../../recources/LoadingStatus';

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<CardProps | undefined>(undefined);
  const [currentSorting, setCurrentSorting] = useState<SortOptions>(SortOptions.POPULAR);

  const currrentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.stateOffers);
  const currentlyLoading = useAppSelector((state) => state.isLoadingOffers);
  const userData = useAppSelector((state) => state.userData);
  const isAuthorized = useAppSelector((state) => state.authorizationStatus);

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

  return (
    <div className="page page--gray page--main">
      <PageHeader isAuthorized={isAuthorized} userData={userData} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOffers.length} places to stay in {currrentCity.name}</b>
              <PlacesSorter currentSorting={currentSorting} onSortingChange={onSortingChange} />
              {currentlyLoading !== LoadingStatus.Success ? <Spinner /> : <OfferList listOfOffers={sortedOffers} onOfferHover={onOfferHover} />}
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currrentCity} points={currentCityOffers} selectedPoint={activeCard} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
