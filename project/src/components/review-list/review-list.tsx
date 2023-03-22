import { MAX_REVIEWS } from '../../common/constants';
import { Reviews } from '../../mocks/reviews';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

function ReviewList(): JSX.Element {

  // TOOD: заменить на реальные данные
  const reviewItems = Reviews.slice(0, Reviews.length > MAX_REVIEWS ? MAX_REVIEWS : Reviews.length);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{Reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewItems.map((item) => <ReviewItem key={`review-${item.id}`} item={item} />)}
      </ul>

      {/* TODO: Добавить проверку - если пользователь авторизован, показывать форму */}
      <ReviewForm />

    </section>
  );
}

export default ReviewList;
