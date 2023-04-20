import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { getCreateReviewLoading } from '../../store/property-data/selectors';

type ReviewFormProps = {
  offerId: number;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {

  const dispatch = useAppDispatch();
  const createReviewLoading = useAppSelector(getCreateReviewLoading);

  const ratingArray = [5, 4, 3, 2, 1];

  const commentRef = useRef<HTMLTextAreaElement | null>(null);

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

    if (!commentRef || !commentRef.current) {
      return;
    }

    commentRef.current.value = '';
  };

  // проверка условий ТЗ - выставлен рейтинг, комментарий в промежутке от 50 до 300 символов
  const checkSubmitAllow = useCallback(() => {
    if (!commentRef || !commentRef.current) {
      setSubmitActive(false);
      return;
    }

    const comment = commentRef.current.value;

    setSubmitActive(rating !== undefined && comment.length >= 50 && comment.length <= 300 && rating > 0);
  }, [rating]);

  useEffect(() => {
    checkSubmitAllow();
  }, [rating, checkSubmitAllow]);

  const handleChangeComment = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    checkSubmitAllow();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentRef || !commentRef.current) {
      return;
    }

    const comment = commentRef.current.value;

    // отправка формы
    if (comment && rating) {
      dispatch(addReviewAction({
        offerId: offerId,
        comment: comment,
        rating: rating
      }))
        .then((result) => {
          // промис выполнился, очищаем форму
          if (result.meta.requestStatus === 'fulfilled') {
            clearForm();
          }
        });
    }
  };

  return (
    <form name="comment-form" className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingArray.map((r) => (
          <Fragment key={r}>
            <input
              aria-label='review-star'
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
        aria-label='review-textarea'
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeComment}
        disabled={createReviewLoading}
        maxLength={300}
        minLength={50}
        ref={commentRef}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button aria-label='review-button' className="reviews__submit form__submit button" type="submit" disabled={!submitActive || createReviewLoading}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
