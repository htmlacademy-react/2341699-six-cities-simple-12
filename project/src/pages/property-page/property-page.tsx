import { Fragment, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppRoute, PageTitles } from '../../common/constants';
import { Capitalized, GetRatingPercent } from '../../common/utils';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import { fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../../store/api-actions';
import { getCurrentOffer, getHasError404, getOffersNearby, getReviews } from '../../store/property-data/selectors';
import { setActiveOffer } from '../../store/main-data/main-data';

function PropertyPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const offersNearby = useAppSelector(getOffersNearby);
  const offer = useAppSelector(getCurrentOffer);
  const reviews = useAppSelector(getReviews);
  const hasError404 = useAppSelector(getHasError404);

  const [pageLoading, setPageLoading] = useState(true);

  const { id } = useParams();
  const offerId = Number(id);

  useEffect(() => {
    document.title = PageTitles.Property;
  }, []);

  useEffect(() => {
    setPageLoading(true);
    dispatch(fetchOfferAction(offerId));
  }, [offerId, dispatch]);

  useEffect(() => {
    if (!offer) { return; }
    setPageLoading(false);
    dispatch(fetchOffersNearbyAction(offer.id));
    dispatch(fetchReviewsAction(offer.id));
    dispatch(setActiveOffer(offer));
  }, [dispatch, offer]);

  useEffect(() => {
    if (hasError404) {
      setPageLoading(false);
    }
  }, [hasError404]);

  if (!pageLoading && (isNaN(offerId) || hasError404)) {
    return (<Navigate to={AppRoute.Erorr404} replace />);
  }

  // загрузка данных
  if (pageLoading || !offer) {
    return (<Spinner />);
  }

  const currentCity = offer.city;

  const ratingPercent = GetRatingPercent(offer.rating);

  // разбиваем описание на параграфы
  const descriptionItems = offer.description.split('\n');

  // массив из первых 6 фотографий
  const randomImages = offer.images.slice(0, offer.images.length > 6 ? 6 : offer.images.length);

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
                {Capitalized(offer.type)}
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

            <ReviewList items={reviews} offerId={offer.id} />

          </div>
        </div>

        <Map containerClassNames='property__map map' city={currentCity} offers={offersNearby} />

      </section>

      <div className="container">

        <OfferList offers={offersNearby} isNearPlaces />

      </div>

    </Fragment>
  );
}

export default PropertyPage;
