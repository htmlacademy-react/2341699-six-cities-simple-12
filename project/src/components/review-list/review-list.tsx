import { useEffect, useState } from 'react';
import { AuthorizationStatus, MAX_REVIEWS, NameSpace } from '../../common/constants';
import { useAppSelector } from '../../hooks';
import Review from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  offerId: number;
  items: Review[];
}

function ReviewList({ offerId, items }: ReviewListProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  const [reviewItems, setReviewItems] = useState<Review[]>([]);

  useEffect(() => {
    // создаем копию массива
    let tempItems = items.map((e) => e);

    // сортировка по дате - от новых к старым
    if (tempItems.length > 1) {
      tempItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // оставляем не больше 10 записей
    tempItems = tempItems.slice(0, tempItems.length > MAX_REVIEWS ? MAX_REVIEWS : tempItems.length);

    setReviewItems(tempItems);
  }, [items]);

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
