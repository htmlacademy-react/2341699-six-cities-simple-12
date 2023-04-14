import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../common/constants';
import Header from './header';

const mockStore = configureMockStore();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
});

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Component: Header', () => {

  it('should render correctly by AuthorizationStatus is NoAuth', () => {

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

});
