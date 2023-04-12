import { datatype, helpers, image, internet } from 'faker';
import Offer from '../types/offer';
import Review from '../types/review';
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

  images: datatype.array(6).map(() => image.imageUrl()),

  description: datatype.string(),

  goods: datatype.array(10).map((e) => String(e)),

  bedrooms: datatype.number(6),
  maxAdults: datatype.number(6),

  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(13),
    },
    name: helpers.randomize(Object.values(Cities))
  },

  isPremium: datatype.boolean(),

  previewImage: image.imageUrl(),

  price: datatype.number(999),

  rating: datatype.float(5),

  title: datatype.string(),

  type: datatype.string(),

  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(13),
  },
});

export const makeFakeReviews = (): Review[] => datatype.array(3).map(() => makeFakeReview());

export const makeFakeReview = (): Review => ({
  comment: datatype.string(),
  date: datatype.datetime().toString(),
  id: datatype.number(),
  rating: datatype.float(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  }
});
