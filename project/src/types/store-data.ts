import { AuthorizationStatus, Cities } from '../common/constants';
import Offer from './offer';
import Review from './review';
import { UserData } from './user-data';

export type StoreData = {
  selectedCityTab: Cities;
  offers: Offer[];
  offersNearby: Offer[];
  currentOffer: Offer | undefined;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userProfile: UserData | undefined;
  reviews: Review[];
  createReviewLoading: boolean;
};
