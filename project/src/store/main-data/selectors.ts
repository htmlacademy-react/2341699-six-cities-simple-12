import { Cities, NameSpace } from '../../common/constants';
import Offer from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.MainData].offers;

export const getCurrentCity = (state: State): Cities => state[NameSpace.MainData].currentCity;
