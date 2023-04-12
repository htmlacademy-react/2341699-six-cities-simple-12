import { makeFakeOffer, makeFakeOffersNearby, makeFakeReviews } from '../../common/mocks';
import { getClonedObject } from '../../common/utils';
import { PropertyData } from '../../types/store';
import { addReviewAction, fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';
import { propertyData, setHasError404 } from './property-data';

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
    let expectedState = getClonedObject(state) as PropertyData;

    expectedState.offersNearbyLoading = true;
    expect(propertyData.reducer(state, { type: fetchOffersNearbyAction.pending.type }))
      .toEqual(expectedState);

    expectedState.offersNearbyLoading = false;
    expectedState.offersNearby = fakeOffersNearby;
    expect(propertyData.reducer(state, { type: fetchOffersNearbyAction.fulfilled.type, payload: fakeOffersNearby }))
      .toEqual(expectedState);
  });

  it('should update currentOffer by load data', () => {

    const fakeCurrentOffer = makeFakeOffer();
    let expectedState = getClonedObject(state) as PropertyData;

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
    let expectedState = getClonedObject(state) as PropertyData;

    expectedState.reviewsLoading = true;
    expect(propertyData.reducer(state, { type: fetchReviewsAction.pending.type }))
      .toEqual(expectedState);

    expectedState.reviewsLoading = false;
    expectedState.reviews = fakeReviews;
    expect(propertyData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: fakeReviews }))
      .toEqual(expectedState);
  });

  it('should update reviews by create-action review', () => {

    const fakeReviews = makeFakeReviews();
    let expectedState = getClonedObject(state) as PropertyData;

    expectedState.createReviewLoading = true;
    expect(propertyData.reducer(state, { type: addReviewAction.pending.type }))
      .toEqual(expectedState);

    expectedState.createReviewLoading = false;
    expectedState.reviews = fakeReviews;
    expect(propertyData.reducer(state, { type: addReviewAction.fulfilled.type, payload: fakeReviews }))
      .toEqual(expectedState);

  });

  it('should update hasError404 by error load current offer', () => {

    const fakeReviews = makeFakeReviews();
    let expectedState = getClonedObject(state) as PropertyData;

    expectedState.hasError404 = true;
    expect(propertyData.reducer(state, { type: setHasError404.type, payload: true }))
      .toEqual(expectedState);

  });

});
