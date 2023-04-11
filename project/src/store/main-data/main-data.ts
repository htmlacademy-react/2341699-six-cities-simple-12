import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cities, NameSpace } from '../../common/constants';
import Offer from '../../types/offer';
import { MainData } from '../../types/store';
import { fetchOffersAction } from '../api-actions';

const initialState: MainData = {
  currentCity: Cities.Paris,
  offers: [],
  offersLoading: false,
  currentOffers: [],
  activeOffer: undefined
};

export const offersData = createSlice({
  name: NameSpace.MainData,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<Cities>) => {
      state.currentCity = action.payload;
    },
    setCurrentOffers: (state, action: PayloadAction<Offer[]>) => {
      state.currentOffers = action.payload;
    },
    setActiveOffer: (state, action: PayloadAction<Offer | undefined>) => {
      state.activeOffer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoading = false;
      });
  }
});

export const { setCity, setCurrentOffers, setActiveOffer } = offersData.actions;
