import { useState } from 'react';
import { Cities } from '../../mocks/cities';
import City from '../../types/city';
import Offer from '../../types/offer';
import { Point } from '../../types/point';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';

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

function MainPage({ offers }: MainProps): JSX.Element {

  const getCityOffers = (cityName: string) => offers.filter((e) => e.city.name === cityName);

  const [currentCity, setCurrentCity] = useState(Cities[3]);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>();
  const [currentOffers, setCurrentOffers] = useState<Offer[]>(getCityOffers(Cities[3].name));
  const [, setSortType] = useState('Popular');

  const handleChangeCurrentCity = (city: City) => {
    setCurrentCity(city);
    setCurrentOffers(getCityOffers(city.name));
  };

  const points = offers.map((offer): Point => ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude
  }));

  const mainClass = currentOffers.length === 0 ? 'page__main--index-empty' : '';

  const offersEmpty = currentOffers.length < 1;

  return (
    <div className={`page__main page__main--index ${mainClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city, i) => (
              <LocationTabItem
                city={city}
                key={city.name}
                isActive={currentCity.name === city.name}
                changeCurrentLocation={handleChangeCurrentCity}
              />))}
          </ul>
        </section>
      </div>

      <div className="cities">

        <div className={`cities__places-container ${offersEmpty ? 'cities__places-container--empty ' : ''}container`}>

          {offersEmpty && <EmptySection cityName={currentCity.name} />}

          {!offersEmpty && <OfferList offers={currentOffers} city={currentCity} changeSelectedPoint={(e) => setSelectedPoint(e)} changeSortType={(e) => setSortType(e)} />}

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

export default MainPage;
