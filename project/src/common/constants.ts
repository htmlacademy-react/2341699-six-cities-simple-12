export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer',
  Erorr404 = '../404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortMenuItems {
  Default = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHightToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

export enum PageTitles {
  Main = 'six cities simple',
  Login = 'six cities simple: authorization',
  Property = 'six cities simple: property',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const API_URL = 'https://12.react.pages.academy/six-cities-simple';
export const REQUEST_TIMEOUT = 5000;

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const AUTH_STORAGE_KEY = 'UserSigned';

export const MAX_OFFERS_NEARBY = 3;

export const MAX_REVIEWS = 10;
