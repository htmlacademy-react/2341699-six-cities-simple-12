import { useAppSelector } from '../../hooks';
import { getReviews, getReviewsLoading, getSortedAndSplicedReviews } from '../../store/property-data/selectors';
import { getUserIsAuthorized } from '../../store/user-process/selectors';
import LoaderLine from '../loader-line/loader-line';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  offerId: number;
}

function ReviewList({ offerId }: ReviewListProps): JSX.Element {

  const userIsAuthorized = useAppSelector(getUserIsAuthorized);

  const reviews = useAppSelector(getReviews);
  const reviewsLoading = useAppSelector(getReviewsLoading);
  const sortedAndSplicedReviews = useAppSelector(getSortedAndSplicedReviews);

  const reviewItems = sortedAndSplicedReviews
    .map((item) => <ReviewItem key={`review-${item.id}`} item={item} />);

  return (
    <section className="property__reviews reviews">

      {!reviewsLoading && <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>}

      <ul className="reviews__list">
        {reviewsLoading ? <LoaderLine /> : reviewItems}
      </ul>

      {userIsAuthorized && <ReviewForm offerId={offerId} />}

    </section>
  );
}

export default ReviewList;
