import { Fragment, useCallback } from 'react';
import { SortMenuItems } from '../../common/constants';
import Offer from '../../types/offer';
import OffersSortingMenu from '../offers-sorting-menu/offers-sorting-menu';
import OfferCard from '../offer-card/offer-card';
import { useAppDispatch } from '../../hooks';
import { setActiveOffer } from '../../store/main-data/main-data';

type OfferListProps = {
  offers: Offer[];
  cityName?: string;
  isNearPlaces?: boolean;
  isAllowChangeActivePoint?: boolean;
  onChangeSortType?: (sortType: SortMenuItems) => void;
};

function OfferList(props: OfferListProps): JSX.Element {

  const dispatch = useAppDispatch();

  const { offers, cityName, isNearPlaces, isAllowChangeActivePoint } = props;
  const { onChangeSortType } = props;

  const handleChangeActiveOffer = useCallback((item: Offer | undefined) => {
    if (!isAllowChangeActivePoint) {
      return;
    }

    dispatch(setActiveOffer(item));
  }, [dispatch, isAllowChangeActivePoint]);

  const offerCards = offers.map((item) => {
    const keyValue = `offer-${item.id}`;
    return <OfferCard key={keyValue} item={item} onChangeActiveOffer={(e) => handleChangeActiveOffer(e)} />;
  });

  const mainClass = isNearPlaces ? 'near-places' : 'cities__places';
  const listClass = isNearPlaces ? 'near-places__list' : 'cities__places-list';

  return (
    <section className={`${mainClass} places`}>

      {!isNearPlaces && (
        <Fragment>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {cityName}</b>
          {onChangeSortType && <OffersSortingMenu onChangeSortType={onChangeSortType} />}
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
