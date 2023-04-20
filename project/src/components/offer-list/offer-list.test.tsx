import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../common/mocks';
import OfferList from './offer-list';

const mockStore = configureMockStore();
const history = createMemoryHistory({ initialEntries: ['/'] });

const fakeOffers = makeFakeOffers();

describe('Component: OfferList', () => {

  const store = mockStore();

  it('should render correctly when isNearPlaces is false', () => {

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <OfferList
            offers={fakeOffers}
            cityName={fakeOffers[0].city.name}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${fakeOffers[0].city.name}`, 'i'))).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeOffers.length);
    expect(listItems[0]).toBeVisible();

  });


  it('should render correctly when isNearPlaces is true', () => {

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <OfferList
            offers={fakeOffers}
            cityName={fakeOffers[0].city.name}
            isNearPlaces
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeOffers.length);
    expect(listItems[0]).toBeVisible();

  });

});
