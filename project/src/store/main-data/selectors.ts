import { Cities, NameSpace } from '../../common/constants';
import Offer from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.MainData].offers;
export const getOffersLoading = (state: State): boolean => state[NameSpace.MainData].offersLoading;

export const getCurrentCity = (state: State): Cities => state[NameSpace.MainData].currentCity;

export const getCurrentOffers = (state: State): Offer[] => state[NameSpace.MainData].currentOffers;

export const getActiveOffer = (state: State): Offer | undefined => state[NameSpace.MainData].activeOffer;
