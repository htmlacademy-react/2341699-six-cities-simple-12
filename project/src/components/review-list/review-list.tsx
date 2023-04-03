import { AuthorizationStatus, MAX_REVIEWS } from '../../common/constants';
import { useAppSelector } from '../../hooks';
import Review from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  offerId: number,
  items: Review[];
}

function ReviewList({ offerId, items }: ReviewListProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  // TOOD: заменить на реальные данные
  const reviewItems = items.slice(0, items.length > MAX_REVIEWS ? MAX_REVIEWS : items.length);

  // сортировка по дате - от новых к старым
  if (reviewItems.length > 1) {
    reviewItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewItems.length}</span></h2>
      <ul className="reviews__list">
        {reviewItems.map((item) => <ReviewItem key={`review-${item.id}`} item={item} />)}
      </ul>

      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm offerId={offerId} />}

    </section>
  );
}

export default ReviewList;
