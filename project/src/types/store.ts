import { AuthorizationStatus, Cities } from '../common/constants';
import Offer from './offer';
import Review from './review';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userProfile: UserData | undefined;
};

export type MainData = {
  currentCity: Cities;
  offers: Offer[];
  offersLoading: boolean;
  currentOffers: Offer[];
  activeOffer: Offer | undefined;
};

export type PropertyData = {
  offersNearby: Offer[];
  offersNearbyLoading: boolean;

  currentOffer: Offer | undefined;
  currentOfferLoading: boolean;

  hasError404: boolean;

  reviews: Review[];
  reviewsLoading: boolean;
  createReviewLoading: boolean;
};
