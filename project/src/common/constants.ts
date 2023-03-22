export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer',
}

export enum SortMenuItems {
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
}

export const SORT_MENU_ITEMS = (): string[] => Object.values(SortMenuItems).filter((e) => isNaN(Number(e))).map((e) => String(e));

export const API_URL = 'https://12.react.pages.academy/six-cities-simple';

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const AUTH_STORAGE_KEY = 'UserSigned';

export const MAX_OFFERS_NEARBY = 3;

export const MAX_REVIEWS = 10;
