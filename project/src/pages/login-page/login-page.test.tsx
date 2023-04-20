
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus } from '../../common/constants';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import LoginPage from './login-page';
import HistoryRouter from '../../components/history-route/history-route';

const history = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: LoginPage', () => {

  it('should render correctly', async () => {

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Sign in').length).toBe(2);

    const emailElement = screen.getByPlaceholderText('Email');
    const passwordElement = screen.getByPlaceholderText('Password');

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();

    await userEvent.type(emailElement, 'test@test.ru');
    await userEvent.type(passwordElement, '123abc');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123abc/i)).toBeInTheDocument();
  });

});

