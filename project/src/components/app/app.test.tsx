import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, Cities } from '../../common/constants';
import App from './app';
import HistoryRouter from '../history-route/history-route';
import { makeFakeOffer } from '../../common/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  'MAIN-DATA': {
    currentCity: Cities.Paris,
    offers: [],
    offersLoading: false,
    currentOffers: [],
    activeOffer: undefined
  },
  'PROPERTY-DATA': {
    offersNearby: [],
    offersNearbyLoading: false,

    currentOffer: fakeOffer,
    currentOfferLoading: false,

    reviews: [],
    reviewsLoading: false,

    createReviewLoading: false,
    hasError404: false,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {

  global.scrollTo = jest.fn();

  it('should render "MainPage" when user navigate to "/" and empty store', () => {

    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${Cities.Paris}`, 'i'))).toBeInTheDocument();
    expect(global.scrollTo).toBeCalledTimes(1);

  });

  it('should render "NotFoundPage" when user navigate to "/Erorr404"', () => {

    history.push(AppRoute.Erorr404);

    render(fakeApp);

    expect(screen.getByText(/Error 404 - Page Not Found/i)).toBeInTheDocument();
    expect(global.scrollTo).toBeCalledTimes(1);

  });

  it('should render "LoginPage" when user navigate to "/login"', () => {

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(global.scrollTo).toBeCalledTimes(1);
  });

  it('should render "PropertyPage" when user navigate to "/offer/1"', () => {

    history.push(`${AppRoute.Room}/1`);

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();

    expect(global.scrollTo).toBeCalledTimes(1);
  });
});
