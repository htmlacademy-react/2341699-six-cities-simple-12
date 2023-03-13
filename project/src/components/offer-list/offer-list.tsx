import { useState } from 'react';
import Offer from '../../types/Offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  placesFound: number;
  offers: Offer[];
  locationName: string;
};

function OfferList({ placesFound, offers, locationName }: OfferListProps): JSX.Element {

  const [focusedItem, setFocusedItem] = useState<Offer>();

  const offerCards = offers.map((item) => {
    const keyValue = `offer-${item.id}`;
    return <OfferCard key={keyValue} item={item} setFocusedItem={(e) => setFocusedItem(e)} />;
  });

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{placesFound} places to stay in {locationName}</b>
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
        <section className="cities__map map">
          {focusedItem?.id}
        </section>
      </div>
    </div>
  );
}

export default OfferList;
