import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Action } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import ReviewForm from './review-form';
import { State } from '../../types/state';
import { APIRoute } from '../../common/constants';
import { makeFakeReview } from '../../common/mocks';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: ReviewForm', () => {

  it('should render correctly', () => {

    const store = mockStore({
      'PROPERTY-DATA': {
        createReviewLoading: false,
      }
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={1} />
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getAllByRole('radio', { name: 'review-star' }).length).toBe(5);
    expect(screen.getByRole('textbox', { name: 'review-textarea' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'review-button' })).toBeInTheDocument();

  });

  it('should form disabled when createReviewLoading is true', () => {

    const store = mockStore({
      'PROPERTY-DATA': {
        createReviewLoading: true,
      }
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={1} />
      </Provider>
    );

    expect(screen.getByRole('textbox', { name: 'review-textarea' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'review-button' })).toBeDisabled();

  });

  it('the form can be sent after filling', async () => {

    const fakeReview = makeFakeReview();

    mockAPI
      .onPost(`${APIRoute.Comments}/1`)
      .reply(200, []);

    const store = mockStore({
      'PROPERTY-DATA': {
        createReviewLoading: false,
      }
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId={1} />
      </Provider>
    );

    const starElement = screen.getAllByRole('radio', { name: 'review-star' })[0];
    const textareaElement = screen.getByRole('textbox', { name: 'review-textarea' });
    const submitButtonElement = screen.getByRole('button', { name: 'review-button' });

    // форма пуста, кнопка не активна
    expect(submitButtonElement).toBeDisabled();

    // выбрали рейтинг и добавили коммент
    await userEvent.click(starElement);
    await userEvent.type(textareaElement, fakeReview.comment);

    // кнопка активна
    expect(submitButtonElement).toBeEnabled();

  });

});
