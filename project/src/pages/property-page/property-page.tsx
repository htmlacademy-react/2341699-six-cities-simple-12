import { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppRoute, MAX_OFFERS_NEARBY, PageTitles } from '../../common/constants';
import { GetRandomArrayItems, GetRatingPercent } from '../../common/utils';
import Offer from '../../types/offer';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';

function PropertyPage(): JSX.Element {

  const offers = useAppSelector((state) => state.offers);

  useEffect(() => {
    document.title = PageTitles.Property;
  }, []);

  const { id } = useParams();

  // записи предложений еще не загружены
  if (!offers || offers.length === 0) {
    return (<div></div>);
  }

  const offer = offers.find((e) => e.id === Number(id));

  // предолжение не найдено, редирект на 404
  if (!offer) {
    return (<Navigate to={AppRoute.Erorr404} replace />);
  }

  const currentCity = offer.city;

  const ratingPercent = GetRatingPercent(offer.rating);

  // разбиваем описание на параграфы
  const descriptionItems = offer.description.split('\n');

  // массив из первых 6 фотографий
  const randomImages = offer.images.slice(0, offer.images.length > 6 ? 6 : offer.images.length);

  //#region Формируем данные предложений поблизости

  const offersNearby = GetRandomArrayItems<Offer>(offers.filter((e) => e.city.name === offer.city.name && e.id !== offer.id), offers.length > MAX_OFFERS_NEARBY ? MAX_OFFERS_NEARBY : offers.length);

  //#endregion

  return (
    <Fragment>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {randomImages.map((imageUrl) => (
              <div key={imageUrl} className="property__image-wrapper">
                <img className="property__image" src={imageUrl} alt={offer.type} />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">

            {offer.isPremium && <div className="property__mark"><span>Premium</span></div>}

            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
            </div>

            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: ratingPercent }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer?.rating}</span>
            </div>

            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} {offer?.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((goodName) => <li key={goodName} className='property__inside-item'>{goodName}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>

                {offer.host.isPro && <span className="property__user-status">Pro</span>}

              </div>
              <div className="property__description">
                {descriptionItems.map((text) => <p key={text} className="property__text">{text}</p>)}
              </div>
            </div>

            <ReviewList />

          </div>
        </div>

        <Map containerClassNames='property__map map' city={currentCity} offers={offersNearby} activeOffer={offer} />

      </section>

      <div className="container">

        <OfferList offers={offersNearby} isNearPlaces />

      </div>

    </Fragment>
  );
}

export default PropertyPage;
