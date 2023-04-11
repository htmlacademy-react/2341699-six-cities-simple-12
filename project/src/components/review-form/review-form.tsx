import { Fragment, useEffect, useState } from 'react';
import { NameSpace } from '../../common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';

type ReviewFormProps = {
  offerId: number;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {

  const dispatch = useAppDispatch();
  const createReviewLoading = useAppSelector((state) => state[NameSpace.PropertyData].createReviewLoading);

  const ratingArray = [5, 4, 3, 2, 1];

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [submitActive, setSubmitActive] = useState(false);

  const clearForm = () => {
    if (rating) {
      const ratingElement = document.getElementById(`${rating}-stars`);
      if (ratingElement) {
        (ratingElement as HTMLInputElement).checked = false;
      }
    }

    setRating(undefined);
    setComment('');
  };

  // проверка условий ТЗ - выставлен рейтинг, комментарий в промежутке от 50 до 300 символов
  useEffect(() => {
    setSubmitActive(rating !== undefined && comment.length >= 50 && comment.length <= 300 && rating > 0);
  }, [comment, rating]);

  const handleChangeComment = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // отправка формы в разработке
    if (comment && rating) {
      dispatch(addReviewAction({
        offerId: offerId,
        comment: comment,
        rating: rating
      }))
        .then((result) => {
          // странная шляпа
          if (result.meta.requestStatus === 'fulfilled') {
            clearForm();
          }
        });
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingArray.map((r) => (
          <Fragment key={r}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={r}
              id={`${r}-stars`}
              type="radio"
              onChange={() => setRating(r)}
              disabled={createReviewLoading}
            />
            <label htmlFor={`${r}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChangeComment}
        disabled={createReviewLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!submitActive || createReviewLoading}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
