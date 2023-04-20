import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import OffersContainer from './offers-container';
import { Cities } from '../../common/constants';
import { makeFakeOffers } from '../../common/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory({ initialEntries: ['/'] });

const fakeOffers = makeFakeOffers();
const fakeCurrentOffers = fakeOffers.filter((e) => e.city.name === fakeOffers[0].city.name);

describe('Component: OffersContainer', () => {

  it('should render correctly when has offers', () => {

    const store = mockStore({
      'MAIN-DATA': {
        currentCity: Cities.Paris,
        offers: fakeOffers,
        offersLoading: false,
        currentOffers: fakeCurrentOffers,
        activeOffer: undefined
      }
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <OffersContainer />
        </Router>
      </Provider>
    );

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeCurrentOffers.length);

  });

  it('should render correctly when offers empty', () => {

    const store = mockStore({
      'MAIN-DATA': {
        currentCity: Cities.Paris,
        offers: [],
        offersLoading: false,
        currentOffers: [],
        activeOffer: undefined
      }
    });

    render(
      <Provider store={store}>
        <OffersContainer />
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${Cities.Paris}`))).toBeInTheDocument();

  });
});
