import { Locations } from '../../common/constants';
import PlaceCard from '../../components/place-card/place-card';
import Offer from '../../types/Offer';

type MainProps = {
  placesFound: number;
};

type LocationTabItemProps = {
  name: string;
};

const offerItems: Offer[] = [
  {
    id: 1,
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',

  },
  {
    id: 2,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4.8,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    id: 3,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 4.8,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 4,
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  }
];

function MainPage(props: MainProps): JSX.Element {
  const mainClass = offerItems.length === 0 ? 'page__main--index-empty' : '';

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${mainClass}`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Locations.map((location) => <LocationTabItem name={location} key={location} />)}
            </ul>
          </section>
        </div>

        <div className="cities">

          {/* Выводим заглушку */}
          {offerItems.length < 1 && <EmptySection />}

          {/* Отрисовываем карточки */}
          {offerItems.length > 0 && <OffersSection {...props} />}

        </div>
      </main>
    </div>
  );
}


function LocationTabItem(props: LocationTabItemProps): JSX.Element {
  const href = `/#${props.name}`;

  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href={href}>
        <span>{props.name}</span>
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

function OffersSection(props: MainProps): JSX.Element {

  const offerCards = offerItems.map((item) => {
    const keyValue = `offer-${item.id}`;
    return <PlaceCard key={keyValue} item={item}></PlaceCard>;
  });

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{props.placesFound} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by &nbsp;</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li
              className="places__option places__option--active"
              tabIndex={0}
            >
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offerCards}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

export default MainPage;
