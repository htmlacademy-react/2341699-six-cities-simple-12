import { useEffect } from 'react';
import { PageTitles } from '../../common/constants';
import Locations from '../../components/locations/locations';
import OffersContainer from '../../components/offers-container/offers-container';
import { useAppSelector } from '../../hooks';
import { getCurrentOffers } from '../../store/main-data/selectors';

function MainPage(): JSX.Element {

  const currentOffers = useAppSelector(getCurrentOffers);

  useEffect(() => {
    document.title = PageTitles.Main;
  }, []);

  return (
    <div className={`page__main page__main--index ${currentOffers.length ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <Locations />
      <OffersContainer />
    </div>
  );
}

export default MainPage;
