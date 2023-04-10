import Offer from '../types/offer';
import { SortMenuItems } from './constants';

export const GetRatingPercent = (value: number, round = false): string => {
  const result = (round ? Math.round(value) : value) / 0.05;
  return `${result}%`;
};

export function GetRandomArrayItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export const Capitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const GetCityOffers = (cityName: string, items: Offer[]) => items.filter((e) => e.city.name === cityName);

export function SortOffers(rawItems: Offer[], sortType: SortMenuItems): Offer[] {

  const items = rawItems.map((e) => e);

  switch (sortType) {
    case SortMenuItems.PriceLowToHigh:
      items.sort((a, b) => a.price - b.price);
      break;
    case SortMenuItems.PriceHightToLow:
      items.sort((a, b) => b.price - a.price);
      break;
    case SortMenuItems.TopRated:
      items.sort((a, b) => b.rating - a.rating);
      break;
  }

  return items;
}
