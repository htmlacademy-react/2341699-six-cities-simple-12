
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AppRoute, Cities } from '../../common/constants';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import MainPage from './main-page';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeOffers } from '../../common/mocks';

const history = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffers = makeFakeOffers();
const fakeCurrentOffers = fakeOffers.filter((e) => e.city.name === fakeOffers[0].city.name);

const store = mockStore({
  'MAIN-DATA': {
    currentCity: Cities.Paris,
    offers: fakeOffers,
    offersLoading: false,
    currentOffers: fakeCurrentOffers,
    activeOffer: undefined
  }
});

describe('Component: MainPage', () => {

  it('should render correctly', () => {

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeCurrentOffers.length);

  });

});

