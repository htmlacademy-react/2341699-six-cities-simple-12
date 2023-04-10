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
  currentOffers: Offer[];
  sortedOffers: Offer[];
  activeOffer: Offer | undefined;
  isOffersDataLoading: boolean;
};

export type PropertyData = {
  offersNearby: Offer[];
  currentOffer: Offer | undefined;
  hasError404: boolean;
  reviews: Review[];
  createReviewLoading: boolean;
};
