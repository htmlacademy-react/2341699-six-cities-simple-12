import { AuthorizationStatus, MAX_REVIEWS, NameSpace } from '../../common/constants';
import { getSortedReviews } from '../../common/utils';
import { useAppSelector } from '../../hooks';
import { getReviews, getReviewsLoading } from '../../store/property-data/selectors';
import LoaderLine from '../loader-line/loader-line';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  offerId: number;
}

function ReviewList({ offerId }: ReviewListProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  const reviews = useAppSelector(getReviews);
  const reviewsLoading = useAppSelector(getReviewsLoading);

  const reviewItems = getSortedReviews(reviews)
    .slice(0, reviews.length > MAX_REVIEWS ? MAX_REVIEWS : reviews.length)
    .map((item) => <ReviewItem key={`review-${item.id}`} item={item} />);

  return (
    <section className="property__reviews reviews">

      {!reviewsLoading && <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewItems.length}</span></h2>}

      <ul className="reviews__list">
        {reviewsLoading ? <LoaderLine /> : reviewItems}
      </ul>

      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm offerId={offerId} />}

    </section>
  );
}

export default ReviewList;
