import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { APIRoute, AppRoute, AuthorizationStatus } from '../common/constants';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import Offer, { Offers } from '../types/offer';
import Review, { NewReview } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute, setAuthorizationStatus, setCreateReviewLoading, setCurrentOffer, setIsOffersDataLoading, setOffers, setOffersNearby, setReviews, setUserProfile } from './actions';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsOffersDataLoading(true));

    const { data } = await api.get<Offers>(APIRoute.Offers);

    dispatch(setOffers(data));
    dispatch(setIsOffersDataLoading(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, { dispatch, extra: api }) => {

    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserProfile(data));
    }
    catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserProfile(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dropToken();
    dispatch(setUserProfile(undefined));
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {

    try {
      dispatch(setCurrentOffer(undefined));
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setCurrentOffer(data));
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.NOT_FOUND) {
          dispatch(redirectToRoute(AppRoute.Erorr404));
        }
      }
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersNearby([]));
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffersNearby(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviews([]));
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(data));
  },
);

export const addReviewAction = createAsyncThunk<void, NewReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setCreateReviewLoading(true));
      const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
      dispatch(setReviews(data));
    }
    finally {
      dispatch(setCreateReviewLoading(false));
    }
  },
);
