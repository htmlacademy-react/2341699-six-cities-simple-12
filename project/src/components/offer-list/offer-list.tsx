import Offer from '../../types/offer';
import City from '../../types/city';
import { Point } from '../../types/point';
import OffersSortingMenu from '../offers-sorting-menu/offers-sorting-menu';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
  city: City;
  changeSelectedPoint: (point: Point | undefined) => void;
  changeSortType: (sortType: string) => void;
};

function OfferList({ offers, city, changeSelectedPoint, changeSortType }: OfferListProps): JSX.Element {

  const changeSelectedOffer = (item: Offer | undefined) => {
    if (!item) {
      changeSelectedPoint(undefined);
      return;
    }

    changeSelectedPoint({
      latitude: item.location.latitude,
      longitude: item.location.longitude
    });
  };

  const offerCards = offers.map((item) => {
    const keyValue = `offer-${item.id}`;
    return <OfferCard key={keyValue} item={item} setFocusedItem={(e) => changeSelectedOffer(e)} />;
  });

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city.name}</b>

      <OffersSortingMenu changeSortType={changeSortType} />

      <div className="cities__places-list places__list tabs__content">
        {offerCards}
      </div>
    </section>
  );
}

export default OfferList;
