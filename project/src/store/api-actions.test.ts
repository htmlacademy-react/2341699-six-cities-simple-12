import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from "../services/api";
import { State } from '../types/state';
import { APIRoute } from '../common/constants';
import { addReviewAction, checkAuthAction, fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction, fetchReviewsAction, loginAction, logoutAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { makeFakeNewReview, makeFakeOffer, makeFakeOffers, makeFakeOffersNearby, makeFakeReviews } from '../common/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch loginAction when POST /login', async () => {
    const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOffersAction when GET /hotels', async () => {

    const fakeOffers = makeFakeOffers();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferAction when GET /hotels/:id return 200', async () => {

    const fakeOffer = makeFakeOffer();
    const id = 1;
    const url = `${APIRoute.Offers}/${id}`;

    mockAPI
      .onGet(url)
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferAction when GET /hotels/:id return 404', async () => {

    const id = 999;
    const url = `${APIRoute.Offers}/${id}`;

    mockAPI
      .onGet(url)
      .reply(404);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.rejected.type,
    ]);

  });

  it('should dispatch fetchOffersNearbyAction when GET /hotels/:id/nearby', async () => {

    const fakeOffersNearby = makeFakeOffersNearby();
    const id = 1;
    const url = `${APIRoute.Offers}/${id}/nearby`;

    mockAPI
      .onGet(url)
      .reply(200, fakeOffersNearby);

    const store = mockStore();

    await store.dispatch(fetchOffersNearbyAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersNearbyAction.pending.type,
      fetchOffersNearbyAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments', async () => {

    const fakeReviews = makeFakeReviews();
    const id = 1;
    const url = `${APIRoute.Comments}/${id}`;

    mockAPI
      .onGet(url)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch addReviewAction when POST /comments', async () => {

    const fakeNewReview = makeFakeNewReview();
    const fakeReviews = makeFakeReviews();

    const url = `${APIRoute.Comments}/${fakeNewReview.offerId}`

    mockAPI
      .onPost(url)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(addReviewAction(fakeNewReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);
  });
});

