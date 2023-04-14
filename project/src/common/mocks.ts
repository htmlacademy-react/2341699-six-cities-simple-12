import { datatype, helpers, image, internet } from 'faker';
import City from '../types/city';
import Offer from '../types/offer';
import Review, { NewReview } from '../types/review';
import { UserData } from '../types/user-data';
import { Cities } from './constants';

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.string(),
  avatarUrl: internet.avatar()
});

export const makeFakeOffers = (): Offer[] => (datatype.array(60).map(() => makeFakeOffer()));

export const makeFakeOffersNearby = (): Offer[] => (datatype.array(3).map(() => makeFakeOffer()));

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),

  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },

  images: datatype.array(6).map(() => image.imageUrl(1234, 2345, 'cat', true)),

  description: datatype.string(),

  goods: datatype.array(10).map((e) => String(e)),

  bedrooms: datatype.number(6),
  maxAdults: datatype.number(6),

  city: makeFakeCity(),

  isPremium: datatype.boolean(),

  previewImage: image.imageUrl(1234, 2345, 'cat', true),

  price: datatype.number(999),

  rating: helpers.randomize([1, 2, 3, 4, 5]),

  title: datatype.string(),

  type: datatype.string(),

  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: helpers.randomize([10, 13, 16]),
  },
});

export const makeFakeReviews = (): Review[] => datatype.array(3).map(() => makeFakeReview());

export const makeFakeReview = (): Review => ({
  comment: datatype.string(50),
  date: datatype.datetime().toString(),
  id: datatype.number(),
  rating: helpers.randomize([1, 2, 3, 4, 5]),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  }
});

export const makeFakeNewReview = (): NewReview => ({
  offerId: 1,
  comment: datatype.string(50),
  rating: helpers.randomize([1, 2, 3, 4, 5]),
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: helpers.randomize([10, 13, 16]),
  },
  name: helpers.randomize(Object.values(Cities))
});
