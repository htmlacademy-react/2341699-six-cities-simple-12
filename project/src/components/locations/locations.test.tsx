import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Locations from './locations';
import { Cities } from '../../common/constants';

const mockStore = configureMockStore();

describe('Component: Locations', () => {

  const store = mockStore({
    'MAIN-DATA': {
      currentCity: Cities.Paris,
    }
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Locations />
      </Provider>
    );

    const citiesLength = Object.values(Cities).length;

    expect(screen.getAllByRole('link').length).toBe(citiesLength);

  });

});
