import { Fragment, useState } from 'react';

function ReviewForm(): JSX.Element {

  const [comment, setComment] = useState<string>();
  const [, setRating] = useState<number | undefined>(undefined);

  const handleChangeComment = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // отправка формы в разработке
    e.preventDefault();
  };

  const ratingArray = [5, 4, 3, 2, 1];

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingArray.map((r) => (
          <Fragment key={r}>
            <input className="form__rating-input visually-hidden" name="rating" value={r} id={`${r}-stars`} type="radio" onChange={() => setRating(r)} />
            <label htmlFor={`${r}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleChangeComment}>
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
