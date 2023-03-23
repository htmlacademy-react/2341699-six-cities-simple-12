import { useEffect, useState } from 'react';
import { PageTitles, SortMenuItems } from '../../common/constants';
import City from '../../types/city';
import Offer from '../../types/offer';
import { Point } from '../../types/point';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { Cities } from '../../mocks/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity, setOffers } from '../../store/actions';

type MainProps = {
  offers: Offer[];
};

type LocationTabItemProps = {
  city: City;
  isActive: boolean;
  changeCurrentLocation: (city: City) => void;
};

type EmptySectionProps = {
  cityName: string;
};

const getCityOffers = (cityName: string, items: Offer[]) => items.filter((e) => e.city.name === cityName);

function MainPage({ offers }: MainProps): JSX.Element {

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers);

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>();
  const [currentSortType, setSortType] = useState<SortMenuItems>(SortMenuItems.Default);

  useEffect(() => {
    document.title = PageTitles.Main;
  }, []);

  // обновляем список предложений в зависимости от города и сортировки
  useEffect(() => {
    let cityOffers = getCityOffers(currentCity.name, offers);
    cityOffers = SortOffers(cityOffers, currentSortType);

    dispatch(setOffers(cityOffers));
  }, [currentCity, dispatch, offers, currentSortType]);

  const points = currentOffers.map((offer): Point => ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude
  }));

  const offersEmpty = currentOffers.length < 1;

  return (
    <div className={`page__main page__main--index ${offersEmpty ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city, i) => (
              <LocationTabItem
                city={city}
                key={city.name}
                isActive={currentCity.name === city.name}
                changeCurrentLocation={(e) => dispatch(setCity(e))}
              />))}
          </ul>
        </section>
      </div>

      <div className="cities">

        <div className={`cities__places-container ${offersEmpty ? 'cities__places-container--empty ' : ''}container`}>

          {offersEmpty && <EmptySection cityName={currentCity.name} />}

          {!offersEmpty && <OfferList offers={currentOffers} cityName={currentCity.name} changeSelectedPoint={(e) => setSelectedPoint(e)} changeSortType={(e) => setSortType(e)} />}

          <div className="cities__right-section">
            {!offersEmpty && <Map containerClassNames='cities__map map' city={currentCity} points={points} selectedPoint={selectedPoint} />}
          </div>

        </div>
      </div>
    </div>
  );
}

function LocationTabItem({ city, isActive, changeCurrentLocation }: LocationTabItemProps): JSX.Element {

  const classLink = isActive ? 'tabs__item--active' : '';
  const href = `/#${city.name}`;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${classLink}`} href={href} onClick={() => changeCurrentLocation(city)}>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

function EmptySection({ cityName }: EmptySectionProps): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
      </div>
    </section>
  );
}

function SortOffers(rawItems: Offer[], sortType: SortMenuItems): Offer[] {

  const items = rawItems.map((e) => e);

  switch (sortType) {
    case SortMenuItems.PriceLowToHigh:
      items.sort((a, b) => a.price - b.price);
      break;
    case SortMenuItems.PriceHightToLow:
      items.sort((a, b) => b.price - a.price);
      break;
    case SortMenuItems.TopRated:
      items.sort((a, b) => b.rating - a.rating);
      break;
  }

  return items;
}

export default MainPage;
