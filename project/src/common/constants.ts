export enum AppRoute {
  Root = '/',
  Login = '/login',
  Main = '/main',
  Offer = '/offer',
}

export const API_URL = 'https://12.react.pages.academy/six-cities-simple';

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const Locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SORT_MENU_ITEMS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export const AUTH_STORAGE_KEY = 'UserSigned';
