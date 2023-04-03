import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, Cities } from '../common/constants';
import Offer from '../types/offer';
import Review from '../types/review';
import { UserData } from '../types/user-data';

export const setCity = createAction<Cities>('setCity');
export const setUserProfile = createAction<UserData | undefined>('data/setUserProfile');

export const setIsOffersDataLoading = createAction<boolean>('data/setIsOffersDataLoading');
export const setIsCurrentOfferDataLoading = createAction<boolean>('data/setIsCurrentOfferDataLoading');

export const setOffers = createAction<Offer[]>('data/setOffers');
export const setOffersNearby = createAction<Offer[]>('data/setOffersNearby');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setAuthorizationStatus');
export const setCurrentOffer = createAction<Offer | undefined>('data/setCurrentOffer');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setReviews = createAction<Review[]>('data/setReviews');
export const setCreateReviewLoading = createAction<boolean>('data/setCreateReaviewLoading');
