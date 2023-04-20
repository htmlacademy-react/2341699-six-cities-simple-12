import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../common/mocks';
import Map from './map';

const mockStore = configureMockStore();

describe('Component: Map', () => {

  it('should render correctly', () => {

    const fakeOffers = makeFakeOffers();

    const store = mockStore({
      'MAIN-DATA': {
        activeOffer: undefined
      }
    });

    render(
      <Provider store={store}>
        <Map
          containerClassNames='cities__map map'
          city={fakeOffers[0].city}
          offers={fakeOffers}
        />
      </Provider>
    );

    expect(screen.getByRole('application')).toBeInTheDocument();

  });

});
