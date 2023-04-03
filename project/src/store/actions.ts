import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities } from '../common/constants';
import Offer from '../types/offer';

export const setCity = createAction<Cities>('setCity');

export const setIsOffersDataLoading = createAction<boolean>('data/setIsOffersDataLoading');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setAuthorizationStatus');
