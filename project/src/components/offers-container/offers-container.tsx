import EmptySection from '../empty-section/empty-section';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import { useEffect, useMemo, useState } from 'react';
import { getCityOffers, getSortedOffers } from '../../common/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortMenuItems } from '../../common/constants';
import { getCurrentCity, getCurrentOffers, getOffers } from '../../store/main-data/selectors';
import { setCurrentOffers } from '../../store/main-data/main-data';
import Offer from '../../types/offer';

function OffersContainer(): JSX.Element {

  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const currentOffers = useAppSelector(getCurrentOffers);

  const [currentSortType, setSortType] = useState<SortMenuItems>(SortMenuItems.Default);
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);

  // обновляем список предложений в зависимости от города
  useEffect(() => {
    const items = getCityOffers(currentCity, offers);
    dispatch(setCurrentOffers(items));
  }, [dispatch, currentCity, offers]);

  // сортировка
  useMemo(() => {
    setSortedOffers(getSortedOffers(currentOffers, currentSortType));
  }, [currentOffers, currentSortType]);

  const offersEmpty = currentOffers.length < 1;

  return (
    <div className='cities'>

      <div className={`cities__places-container ${offersEmpty ? 'cities__places-container--empty ' : ''}container`}>

        {offersEmpty ?
          <EmptySection cityName={currentCity} />
          : <OfferList offers={sortedOffers} cityName={currentCity} onChangeSortType={(e) => setSortType(e)} isAllowChangeActivePoint />}

        <div className='cities__right-section'>
          {!offersEmpty && <Map containerClassNames='cities__map map' city={currentOffers[0].city} offers={currentOffers} />}
        </div>

      </div>
    </div>
  );
}

export default OffersContainer;
