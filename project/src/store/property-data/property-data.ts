import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/constants';
import { PropertyData } from '../../types/store';
import { addReviewAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';

const initialState: PropertyData = {
  offersNearby: [],
  currentOffer: undefined,
  reviews: [],
  createReviewLoading: false,
  hasError404: false
};

export const propertyData = createSlice({
  name: NameSpace.PropertyData,
  initialState,
  reducers: {
    setHasError404: (state, action: PayloadAction<boolean>) => {
      state.hasError404 = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError404 = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.createReviewLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.createReviewLoading = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.createReviewLoading = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.createReviewLoading = false;
      });
  }
});

export const { setHasError404 } = propertyData.actions;
