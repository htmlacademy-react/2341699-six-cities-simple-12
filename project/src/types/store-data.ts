import { AuthorizationStatus, Cities } from '../common/constants';
import Offer from './offer';

export type StoreData = {
  selectedCityTab: Cities;
  offers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
};
