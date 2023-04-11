import { NameSpace } from '../../common/constants';
import Offer from '../../types/offer';
import Review from '../../types/review';
import { State } from '../../types/state';

export const getOffersNearby = (state: State): Offer[] => state[NameSpace.PropertyData].offersNearby;
export const getOffersNearbyLoading = (state: State): boolean => state[NameSpace.PropertyData].offersNearbyLoading;

export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.PropertyData].currentOffer;
export const getCurrentOfferLoading = (state: State): boolean => state[NameSpace.PropertyData].currentOfferLoading;

export const getReviews = (state: State): Review[] => state[NameSpace.PropertyData].reviews;
export const getReviewsLoading = (state: State): boolean => state[NameSpace.PropertyData].reviewsLoading;

export const getHasError404 = (state: State): boolean => state[NameSpace.PropertyData].hasError404;
