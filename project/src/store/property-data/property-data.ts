import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/constants';
import { PropertyData } from '../../types/store';
import { addReviewAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';

const initialState: PropertyData = {
  offersNearby: [],
  offersNearbyLoading: false,

  currentOffer: undefined,
  currentOfferLoading: false,

  reviews: [],
  reviewsLoading: false,

  createReviewLoading: false,
  hasError404: false,
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
        state.currentOffer = undefined;
        state.currentOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.currentOfferLoading = false;
      })
      .addCase(fetchOffersNearbyAction.pending, (state, action) => {
        state.offersNearby = [];
        state.offersNearbyLoading = true;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.offersNearbyLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviews = [];
        state.reviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsLoading = false;
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
