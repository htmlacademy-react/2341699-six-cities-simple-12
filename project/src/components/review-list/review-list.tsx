import { Reviews } from '../../mocks/reviews';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

function ReviewList(): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{Reviews.length}</span></h2>
      <ul className="reviews__list">
        {Reviews.map((item) => <ReviewItem key={`review-${item.id}`} item={item} />)}
      </ul>

      {/* TODO: Добавить проверку - если пользователь авторизован, показывать форму */}
      <ReviewForm />

    </section>
  );
}

export default ReviewList;
