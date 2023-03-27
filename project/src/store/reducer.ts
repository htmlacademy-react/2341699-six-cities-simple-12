import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './actions';
import { StoreData } from '../types/store-data';
import { Cities } from '../mocks/cities';
import { Offers } from '../mocks/offers';

const initialState: StoreData = {
  city: Cities[0],
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });

  // TODO: переделать на реальные данные
  builder.addCase(setOffers, (state) => {
    state.offers = Offers;
  });

  // builder.addCase(setOffers, (state, action) => {
  //   state.offers = action.payload;
  // });

});

export default reducer;
