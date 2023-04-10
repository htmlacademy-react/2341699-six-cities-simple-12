import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, NameSpace } from '../../common/constants';
import { MainData } from '../../types/store';
import { fetchOffersAction } from '../api-actions';

const initialState: MainData = {
  currentCity: Cities.Paris,
  offers: [],
  isOffersDataLoading: false
};

export const offersData = createSlice({
  name: NameSpace.MainData,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<Cities>) => {
      state.currentCity = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      });
  }
});

export const { setCity } = offersData.actions;
