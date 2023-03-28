import { useEffect, useState } from 'react';
import { Cities, PageTitles, SortMenuItems } from '../../common/constants';
import City from '../../types/city';
import Offer from '../../types/offer';
import { Point } from '../../types/point';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/actions';

type LocationTabItemProps = {
  city: Cities;
  isActive: boolean;
  changeCurrentLocation: (e: React.MouseEvent<HTMLAnchorElement>, city: Cities) => void;
};

type EmptySectionProps = {
  cityName: string;
};

const getCityOffers = (cityName: string, items: Offer[]) => items.filter((e) => e.city.name === cityName);

function MainPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const gitCityByName = (name: string) => offers.find((offer) => offer.city.name === name)?.city;

  const selectedCityTab = useAppSelector((state) => state.selectedCityTab);
  const offers = useAppSelector((state) => state.offers);

  const [currentCity, setCurrentCity] = useState<City | undefined>(gitCityByName(selectedCityTab));
  const [currentOffers, setCurrentOffers] = useState<Offer[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>();
  const [currentSortType, setSortType] = useState<SortMenuItems>(SortMenuItems.Default);

  useEffect(() => {
    document.title = PageTitles.Main;
  }, []);

  // обновляем список предложений в зависимости от города и сортировки
  useEffect(() => {
    let cityOffers = getCityOffers(selectedCityTab, offers);
    cityOffers = SortOffers(cityOffers, currentSortType);

    setCurrentOffers(cityOffers);

  }, [selectedCityTab, dispatch, offers, currentSortType]);

  const handleChangeCity = (e: React.MouseEvent<HTMLAnchorElement>, city: Cities) => {
    e.preventDefault();
    dispatch(setCity(Cities[city]));

    setCurrentCity(gitCityByName(Cities[city]));
  };

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
            {Object.values(Cities).map((city) => (
              <LocationTabItem
                city={city}
                key={city}
                isActive={selectedCityTab === city}
                changeCurrentLocation={handleChangeCity}
              />))}
          </ul>
        </section>
      </div>

      <div className="cities">

        <div className={`cities__places-container ${offersEmpty ? 'cities__places-container--empty ' : ''}container`}>

          {offersEmpty && <EmptySection cityName={selectedCityTab} />}

          {!offersEmpty && <OfferList offers={currentOffers} cityName={selectedCityTab} changeSelectedPoint={(e) => setSelectedPoint(e)} changeSortType={(e) => setSortType(e)} />}

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

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${classLink}`} href={'/'} onClick={(e) => changeCurrentLocation(e, city)}>
        <span>{city}</span>
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
