import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../common/constants';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import UserAuth from './user-auth';
import { makeFakeUserData } from '../../common/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Component: UserAuth', () => {

  it('should render correctly when user not authed', () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <UserAuth />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();

  });

  it('should render correctly when user authed', () => {

    const fakeUserProfile = makeFakeUserData();

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userProfile: fakeUserProfile,
      },
    });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <UserAuth />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Log Out')).toBeInTheDocument();
    expect(screen.getByText(fakeUserProfile.email)).toBeInTheDocument();
  });

  it('should render correctly when location.pathname is /login', () => {

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <UserAuth />
        </Router>
      </Provider>
    );

    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
  });
});
