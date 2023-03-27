import { createAction } from '@reduxjs/toolkit';
import City from '../types/city';
//import Offer from '../types/offer';

export const setCity = createAction<City>('setCity');

export const setOffers = createAction('setOffers');
//export const setOffers = createAction<Offer[]>('setOffers');
