import { useCallback, useEffect, useMemo, useState } from 'react';
import { Cities, NameSpace, PageTitles, SortMenuItems } from '../../common/constants';
import Offer from '../../types/offer';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/main-data/main-data';
import { getOffers } from '../../store/main-data/selectors';
import EmptySection from '../../components/empty-section/empty-section';
import LocationTabItem from '../../components/location-tab-item/location-tab-item';
import { SortOffers, GetCityOffers } from '../../common/utils';

function MainPage(): JSX.Element {

  const dispatch = useAppDispatch();

  // из селектора не выбирает первый город (после смены города, необходима перерисовка компонента...),
  //const selectedCityTab = useAppSelector(getCurrentCity);

  // обращаемся на прямую в сторе
  const selectedCityTab = useAppSelector((state) => state[NameSpace.MainData].currentCity);

  const offers = useAppSelector(getOffers);

  const [currentOffers, setCurrentOffers] = useState<Offer[]>([]);
  const [sortedOffers, setSortedOffers] = useState<Offer[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer>();
  const [currentSortType, setSortType] = useState<SortMenuItems>(SortMenuItems.Default);

  useEffect(() => {
    document.title = PageTitles.Main;
  }, []);

  // обновляем список предложений в зависимости от города
  useMemo(() => {
    const items = GetCityOffers(selectedCityTab, offers);
    setCurrentOffers(items);
  }, [selectedCityTab, offers]);

  // сортировка
  useMemo(() => {
    const items = SortOffers(currentOffers, currentSortType);
    setSortedOffers(items);
  }, [currentOffers, currentSortType]);

  const handleChangeCity = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, city: Cities) => {
      e.preventDefault();
      dispatch(setCity(Cities[city]));
    },
    [dispatch],
  );

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

          {!offersEmpty && <OfferList offers={sortedOffers} cityName={selectedCityTab} changeSelectedPoint={(e) => setActiveOffer(e)} changeSortType={(e) => setSortType(e)} />}

          <div className="cities__right-section">
            {!offersEmpty && <Map containerClassNames='cities__map map' city={currentOffers[0].city} offers={currentOffers} activeOffer={activeOffer} />}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainPage;
