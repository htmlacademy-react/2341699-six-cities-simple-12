import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../common/constants';
import { Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { loadOffers, setIsOffersDataLoading } from './actions';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsOffersDataLoading(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));

    // для теста спиннера, потом убрать
    setTimeout(() => dispatch(setIsOffersDataLoading(false)), 1000);
    //dispatch(setIsOffersDataLoading(false));
  },
);
