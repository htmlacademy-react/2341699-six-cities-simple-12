import { Fragment } from 'react';
import { SortMenuItems } from '../../common/constants';
import Offer from '../../types/offer';
import OffersSortingMenu from '../offers-sorting-menu/offers-sorting-menu';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
  cityName?: string;
  isNearPlaces?: boolean;
  changeSelectedPoint?: (item: Offer | undefined) => void;
  changeSortType?: (sortType: SortMenuItems) => void;
};

function OfferList(props: OfferListProps): JSX.Element {

  const { offers, cityName, isNearPlaces } = props;
  const { changeSelectedPoint, changeSortType } = props;

  const changeSelectedOffer = (item: Offer | undefined) => {
    if (!item && changeSelectedPoint) {
      changeSelectedPoint(undefined);
      return;
    }

    if (item && changeSelectedPoint) {
      changeSelectedPoint(item);
    }
  };

  const offerCards = offers.map((item) => {
    const keyValue = `offer-${item.id}`;
    return <OfferCard key={keyValue} item={item} setActiveItem={(e) => changeSelectedOffer(e)} />;
  });

  const mainClass = isNearPlaces ? 'near-places' : 'cities__places';
  const listClass = isNearPlaces ? 'near-places__list' : 'cities__places-list';

  return (
    <section className={`${mainClass} places`}>

      {!isNearPlaces && (
        <Fragment>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {cityName}</b>
          <OffersSortingMenu changeSortType={changeSortType} />
        </Fragment>
      )}

      {isNearPlaces && <h2 className="near-places__title">Other places in the neighbourhood</h2>}

      <div className={`${listClass} places__list ${(isNearPlaces ? '' : 'tabs__content')}`}>
        {offerCards}
      </div>
    </section>
  );
}

export default OfferList;
