import { NameSpace } from '../../common/constants';
import Offer from '../../types/offer';
import Review from '../../types/review';
import { State } from '../../types/state';

export const getOffersNearby = (state: State): Offer[] => state[NameSpace.PropertyData].offersNearby;

export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.PropertyData].currentOffer;

export const getReviews = (state: State): Review[] => state[NameSpace.PropertyData].reviews;

export const getHasError404 = (state: State): boolean => state[NameSpace.PropertyData].hasError404;
