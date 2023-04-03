import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, setAuthorizationStatus, setCity, setIsOffersDataLoading } from './actions';
import { StoreData } from '../types/store-data';
import { AuthorizationStatus, Cities } from '../common/constants';

const initialState: StoreData = {
  selectedCityTab: Cities.Paris,
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(setCity, (state, action) => {
    state.selectedCityTab = action.payload;
  });

  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(setIsOffersDataLoading, (state, action) => {
    state.isOffersDataLoading = action.payload;
  });

  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });

});

export default reducer;
