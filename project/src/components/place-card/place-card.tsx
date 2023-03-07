import Place from '../../types/Place';

function PlaceCard(props: Place): JSX.Element {

  let mark;

  if (props.mark) {
    mark = <div className="place-card__mark"><span>{props.mark}</span></div>;
  }

  return (
    <article className="cities__card place-card">

      {mark}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img
            className="place-card__image"
            src={props.img}
            width="260"
            height="200"
            alt="Place"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{props.priceValue}</b>
            <span className="place-card__price-text">
              &nbsp;&#47;&nbsp;{props.priceText}
            </span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${props.starsPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">
            {props.name}
          </a>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
