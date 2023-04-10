import { useEffect } from 'react';
import { NameSpace, PageTitles } from '../../common/constants';
import Locations from '../../components/locations/locations';
import OffersContainer from '../../components/offers-container/offers-container';
import { useAppSelector } from '../../hooks';

function MainPage(): JSX.Element {

  const currentOffers = useAppSelector((state) => state[NameSpace.MainData].currentOffers);

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
