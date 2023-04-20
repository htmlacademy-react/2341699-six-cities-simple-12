import { makeFakeOffer, makeFakeOffersNearby, makeFakeReviews } from '../../common/mocks';
import { getClonedObject } from '../../common/utils';
import { PropertyData } from '../../types/store';
import { addReviewAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';
import { propertyData } from './property-data';

describe('Reducer: property-data', () => {

  let state: PropertyData;

  beforeEach(() => {
    state = {
      offersNearby: [],
      offersNearbyLoading: false,

      currentOffer: undefined,
      currentOfferLoading: false,

      reviews: [],
      reviewsLoading: false,

      createReviewLoading: false,
      hasError404: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(propertyData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should update offersNearby by load data', () => {

    const fakeOffersNearby = makeFakeOffersNearby();
    const expectedState = getClonedObject<PropertyData>(state);

    expectedState.offersNearbyLoading = true;
    expect(propertyData.reducer(state, { type: fetchOffersNearbyAction.pending.type }))
      .toEqual(expectedState);

    expectedState.offersNearbyLoading = false;
    expect(propertyData.reducer(state, { type: fetchOffersNearbyAction.rejected.type }))
      .toEqual(expectedState);

    expectedState.offersNearbyLoading = false;
    expectedState.offersNearby = fakeOffersNearby;
    expect(propertyData.reducer(state, { type: fetchOffersNearbyAction.fulfilled.type, payload: fakeOffersNearby }))
      .toEqual(expectedState);
  });

  it('should update currentOffer by load data', () => {

    const fakeCurrentOffer = makeFakeOffer();
    const expectedState = getClonedObject<PropertyData>(state);

    expectedState.currentOfferLoading = true;
    expect(propertyData.reducer(state, { type: fetchOfferAction.pending.type }))
      .toEqual(expectedState);

    expectedState.currentOfferLoading = false;
    expectedState.currentOffer = fakeCurrentOffer;
    expect(propertyData.reducer(state, { type: fetchOfferAction.fulfilled.type, payload: fakeCurrentOffer }))
      .toEqual(expectedState);
  });

  it('should update reviews by load data', () => {

    const fakeReviews = makeFakeReviews();
    const expectedState = getClonedObject<PropertyData>(state);

    expectedState.reviewsLoading = true;
    expect(propertyData.reducer(state, { type: fetchReviewsAction.pending.type }))
      .toEqual(expectedState);

    expectedState.reviewsLoading = false;
    expect(propertyData.reducer(state, { type: fetchReviewsAction.rejected.type }))
      .toEqual(expectedState);

    expectedState.reviews = fakeReviews;
    expect(propertyData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: fakeReviews }))
      .toEqual(expectedState);
  });

  it('should update reviews by create-action review', () => {

    const fakeReviews = makeFakeReviews();
    const expectedState = getClonedObject<PropertyData>(state);

    expectedState.createReviewLoading = true;
    expect(propertyData.reducer(state, { type: addReviewAction.pending.type }))
      .toEqual(expectedState);

    expectedState.createReviewLoading = false;
    expect(propertyData.reducer(state, { type: addReviewAction.rejected.type }))
      .toEqual(expectedState);

    expectedState.reviews = fakeReviews;
    expect(propertyData.reducer(state, { type: addReviewAction.fulfilled.type, payload: fakeReviews }))
      .toEqual(expectedState);


  });

});
