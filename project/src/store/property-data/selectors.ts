import { MAX_REVIEWS, NameSpace } from '../../common/constants';
import { getSortedReviews } from '../../common/utils';
import Offer from '../../types/offer';
import Review from '../../types/review';
import { State } from '../../types/state';

export const getOffersNearby = (state: State): Offer[] => state[NameSpace.PropertyData].offersNearby;
export const getOffersNearbyLoading = (state: State): boolean => state[NameSpace.PropertyData].offersNearbyLoading;

export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.PropertyData].currentOffer;
export const getCurrentOfferLoading = (state: State): boolean => state[NameSpace.PropertyData].currentOfferLoading;

export const getReviews = (state: State): Review[] => state[NameSpace.PropertyData].reviews;

export const getSortedAndSplicedReviews = (state: State): Review[] => {
  const reviews = state[NameSpace.PropertyData].reviews;
  return getSortedReviews(reviews)
    .slice(0, reviews.length > MAX_REVIEWS ? MAX_REVIEWS : reviews.length);
};

export const getReviewsLoading = (state: State): boolean => state[NameSpace.PropertyData].reviewsLoading;

export const getHasError404 = (state: State): boolean => state[NameSpace.PropertyData].hasError404;

export const getCreateReviewLoading = (state: State): boolean => state[NameSpace.PropertyData].createReviewLoading;
