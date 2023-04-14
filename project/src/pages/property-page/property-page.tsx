import { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppRoute, PageTitles } from '../../common/constants';
import { getCapitalized, getRatingPercent } from '../../common/utils';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '../../components/spinner/spinner';
import { fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../../store/api-actions';
import { getCurrentOffer, getCurrentOfferLoading, getHasError404, getOffersNearby, getOffersNearbyLoading } from '../../store/property-data/selectors';
import { setActiveOffer } from '../../store/main-data/main-data';
import LoaderLine from '../../components/loader-line/loader-line';

function PropertyPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const offersNearby = useAppSelector(getOffersNearby);
  const offersNearbyLoading = useAppSelector(getOffersNearbyLoading);

  const offer = useAppSelector(getCurrentOffer);
  const offerLoading = useAppSelector(getCurrentOfferLoading);

  const hasError404 = useAppSelector(getHasError404);

  const { id } = useParams();
  const offerId = Number(id);

  useEffect(() => {
    document.title = PageTitles.Property;
  }, []);

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
  }, [offerId, dispatch]);

  useEffect(() => {
    if (!offer || offerId !== offer.id) { return; }
    dispatch(fetchOffersNearbyAction(offer.id));
    dispatch(fetchReviewsAction(offer.id));
    dispatch(setActiveOffer(offer));
  }, [dispatch, offer, offerId]);

  if (!offerLoading && (isNaN(offerId) || hasError404)) {
    return (<Navigate to={AppRoute.Erorr404} replace />);
  }

  // загрузка данных
  if (offerLoading || !offer) {
    return (<Spinner />);
  }

  const currentCity = offer.city;

  const ratingPercent = getRatingPercent(offer.rating);

  // разбиваем описание на параграфы
  const descriptionItems = offer.description.split('\n');

  // массив из первых 6 фотографий
  const randomImages = offer.images.slice(0, offer.images.length > 6 ? 6 : offer.images.length);

  return (
    <Fragment>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {randomImages.map((imageUrl, i) => (
              <div key={`image_${String(i)}`} className="property__image-wrapper">
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
                {getCapitalized(offer.type)}
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

            <ReviewList offerId={offer.id} />

          </div>
        </div>

        <Map containerClassNames='property__map map' city={currentCity} offers={offersNearby} />

      </section>

      <div className="container">
        {offersNearbyLoading ? <LoaderLine /> : <OfferList offers={offersNearby} isNearPlaces />}
      </div>

    </Fragment>
  );
}

export default PropertyPage;
