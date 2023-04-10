// import { createReducer } from '@reduxjs/toolkit';
// import { setAuthorizationStatus, setCity, setCreateReviewLoading, setCurrentOffer, setIsOffersDataLoading, setOffers, setOffersNearby, setReviews, setUserProfile } from './actions';
// import { StoreData } from '../types/store';
// import { AuthorizationStatus, Cities } from '../common/constants';

// const initialState: StoreData = {
//   selectedCityTab: Cities.Paris,
//   offers: [],
//   isOffersDataLoading: false,
//   authorizationStatus: AuthorizationStatus.Unknown,
//   userProfile: undefined,
//   currentOffer: undefined,
//   offersNearby: [],
//   reviews: [],
//   createReviewLoading: false
// };

// const reducer = createReducer(initialState, (builder) => {

//   builder.addCase(setCity, (state, action) => {
//     state.selectedCityTab = action.payload;
//   });

//   builder.addCase(setUserProfile, (state, action) => {
//     state.userProfile = action.payload;
//   });

//   builder.addCase(setOffers, (state, action) => {
//     state.offers = action.payload;
//   });

//   builder.addCase(setCurrentOffer, (state, action) => {
//     state.currentOffer = action.payload;
//   });

//   builder.addCase(setIsOffersDataLoading, (state, action) => {
//     state.isOffersDataLoading = action.payload;
//   });

//   builder.addCase(setAuthorizationStatus, (state, action) => {
//     state.authorizationStatus = action.payload;
//   });

//   builder.addCase(setOffersNearby, (state, action) => {
//     state.offersNearby = action.payload;
//   });

//   builder.addCase(setReviews, (state, action) => {
//     state.reviews = action.payload;
//   });

//   builder.addCase(setCreateReviewLoading, (state, action) => {
//     state.createReviewLoading = action.payload;
//   });

// });

// export default reducer;
