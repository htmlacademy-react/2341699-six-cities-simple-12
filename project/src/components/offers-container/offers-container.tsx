import EmptySection from '../empty-section/empty-section';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import { useEffect, useState } from 'react';
import { GetCityOffers, SortOffers } from '../../common/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NameSpace, SortMenuItems } from '../../common/constants';
import { getOffers } from '../../store/main-data/selectors';
import { setCurrentOffers, setSortedOffers } from '../../store/main-data/main-data';

function OffersContainer(): JSX.Element {

  const dispatch = useAppDispatch();

  // обращаемся на прямую в сторе
  const selectedCityTab = useAppSelector((state) => state[NameSpace.MainData].currentCity);
  const currentOffers = useAppSelector((state) => state[NameSpace.MainData].currentOffers);
  const sortedOffers = useAppSelector((state) => state[NameSpace.MainData].sortedOffers);

  const offers = useAppSelector(getOffers);

  const [currentSortType, setSortType] = useState<SortMenuItems>(SortMenuItems.Default);

  // обновляем список предложений в зависимости от города
  useEffect(() => {
    const items = GetCityOffers(selectedCityTab, offers);
    dispatch(setCurrentOffers(items));
  }, [dispatch, selectedCityTab, offers]);

  // сортировка
  useEffect(() => {
    const items = SortOffers(currentOffers, currentSortType);
    dispatch(setSortedOffers(items));
  }, [dispatch, currentOffers, currentSortType]);

  const offersEmpty = currentOffers.length < 1;

  return (
    <div className='cities'>

      <div className={`cities__places-container ${offersEmpty ? 'cities__places-container--empty ' : ''}container`}>

        {offersEmpty && <EmptySection cityName={selectedCityTab} />}

        {!offersEmpty && <OfferList offers={sortedOffers} cityName={selectedCityTab} changeSortType={(e) => setSortType(e)} isAllowChangeActivePoint />}

        <div className='cities__right-section'>
          {!offersEmpty && <Map containerClassNames='cities__map map' city={currentOffers[0].city} offers={currentOffers} />}
        </div>

      </div>
    </div>
  );
}

export default OffersContainer;
