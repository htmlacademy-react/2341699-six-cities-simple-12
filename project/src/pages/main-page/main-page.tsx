import { useState } from 'react';
import { Locations } from '../../common/constants';
import OfferList from '../../components/offer-list/offer-list';
import Offer from '../../types/Offer';

type MainProps = {
  placesFound: number;
  offers: Offer[];
};

type LocationTabItemProps = {
  name: string;
  isActive: boolean;
  changeCurrentLocation: (location: string) => void;
};

function MainPage({ placesFound, offers }: MainProps): JSX.Element {

  const [currentLocation, setCurrentLocation] = useState(Locations[0]);

  const handleChangeCurrentLocation = (location: string) => setCurrentLocation(location);

  const mainClass = offers.length === 0 ? 'page__main--index-empty' : '';

  return (
    <div className={`page__main page__main--index ${mainClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Locations.map((locationName, i) => (
              <LocationTabItem
                name={locationName}
                key={locationName}
                isActive={currentLocation === locationName}
                changeCurrentLocation={handleChangeCurrentLocation}
              />))}
          </ul>
        </section>
      </div>

      <div className="cities">

        {offers.length < 1 && <EmptySection />}

        {offers.length > 0 && <OfferList placesFound={placesFound} offers={offers} locationName={currentLocation} />}

      </div>
    </div>
  );
}


function LocationTabItem({ name, isActive, changeCurrentLocation }: LocationTabItemProps): JSX.Element {

  const classLink = isActive ? 'tabs__item--active' : '';
  const href = `/#${name}`;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${classLink}`} href={href} onClick={() => changeCurrentLocation(name)}>
        <span>{name}</span>
      </a>
    </li>
  );
}

function EmptySection(): JSX.Element {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}

export default MainPage;
