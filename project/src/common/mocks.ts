import { faker } from '@faker-js/faker';
import City from '../types/city';
import Offer from '../types/offer';
import Review, { NewReview } from '../types/review';
import { UserData } from '../types/user-data';
import { Cities } from './constants';

export const makeFakeUserData = (): UserData => ({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  token: faker.datatype.string(),
  avatarUrl: faker.internet.avatar()
});

export const makeFakeOffers = (): Offer[] => (faker.datatype.array(10).map(() => makeFakeOffer()));

export const makeFakeOffersNearby = (): Offer[] => (faker.datatype.array(3).map(() => makeFakeOffer()));

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.number(),

  host: {
    avatarUrl: faker.internet.avatar(),
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: faker.internet.userName(),
  },

  images: faker.datatype.array(6).map(() => faker.image.imageUrl(640, 480, faker.lorem.word(), true)),

  description: faker.lorem.paragraph(1),

  goods: faker.datatype.array(10).map(() => faker.lorem.word()),

  bedrooms: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  maxAdults: faker.helpers.arrayElement([1, 2, 3, 4, 5]),

  city: makeFakeCity(),

  isPremium: faker.datatype.boolean(),

  previewImage: faker.image.imageUrl(640, 480, faker.lorem.word(), true),

  price: Number(faker.commerce.price(100, 999)),

  rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),

  title: faker.lorem.paragraph(1),

  type: faker.lorem.word(),

  location: {
    latitude: faker.datatype.float(),
    longitude: faker.datatype.float(),
    zoom: faker.helpers.arrayElement([10, 13, 16]),
  },
});

export const makeFakeReviews = (): Review[] => faker.datatype.array(3).map(() => makeFakeReview());

export const makeFakeReview = (): Review => ({
  comment: faker.lorem.paragraph(2),
  date: faker.datatype.datetime().toString(),
  id: faker.datatype.number(),
  rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  user: {
    avatarUrl: faker.internet.avatar(),
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: faker.internet.userName(),
  }
});

export const makeFakeNewReview = (): NewReview => ({
  offerId: 1,
  comment: faker.lorem.paragraph(1),
  rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: faker.datatype.float(),
    longitude: faker.datatype.float(),
    zoom: faker.helpers.arrayElement([10, 13, 16]),
  },
  name: faker.helpers.arrayElement(Object.values(Cities))
});
