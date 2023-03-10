import { Link } from 'react-router-dom';
import Offer from '../../types/Offer';

type PlaceCardProps = {
  item: Offer;
};

function PlaceCard({ item }: PlaceCardProps): JSX.Element {

  const ratingPercent = `${item.rating / 0.05}%`;
  const offerUrl = `/offer/${item.id}`;

  return (
    <article className="cities__card place-card">

      {item.isPremium && <div className="place-card__mark"><span>Premium</span></div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerUrl}>
          <img
            className="place-card__image"
            src={item.previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{item.price}</b>
            <span className="place-card__price-text">
              &nbsp;&#47;&nbsp;night
            </span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingPercent }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerUrl}>
            {item.title}
          </Link>
        </h2>
        <p className="place-card__type">{item.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
