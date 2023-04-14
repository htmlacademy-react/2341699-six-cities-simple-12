import { Cities } from '../../common/constants';
import { makeFakeOffer, makeFakeOffers } from '../../common/mocks';
import { getClonedObject } from '../../common/utils';
import { MainData } from '../../types/store';
import { fetchOffersAction } from '../api-actions';
import { mainData, setActiveOffer, setCity, setCurrentOffers } from './main-data';

describe('Reducer: main-data', () => {

  let state: MainData;

  beforeEach(() => {
    state = {
      currentCity: Cities.Paris,
      offers: [],
      offersLoading: false,
      currentOffers: [],
      activeOffer: undefined
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should update offers by load data', () => {

    const fakeOffers = makeFakeOffers();

    const expectedState = getClonedObject<MainData>(state);

    expectedState.offersLoading = true;
    expect(mainData.reducer(state, { type: fetchOffersAction.pending.type }))
      .toEqual(expectedState);

    expectedState.offersLoading = false;
    expect(mainData.reducer(state, { type: fetchOffersAction.rejected.type }))
      .toEqual(expectedState);

    expectedState.offers = fakeOffers;
    expect(mainData.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: fakeOffers }))
      .toEqual(expectedState);
  });

  it('should update currentCity by Cities', () => {

    const expectedState = getClonedObject<MainData>(state);

    expectedState.currentCity = Cities.Amsterdam;
    expect(mainData.reducer(state, { type: setCity.type, payload: Cities.Amsterdam }))
      .toEqual(expectedState);

  });

  it('should update currentOffers by array data', () => {

    const fakeOffers = makeFakeOffers();

    const expectedState = getClonedObject<MainData>(state);

    expectedState.currentOffers = fakeOffers;
    expect(mainData.reducer(state, { type: setCurrentOffers.type, payload: fakeOffers }))
      .toEqual(expectedState);

  });

  it('should update activeOffer by offer', () => {

    const fakeOffer = makeFakeOffer();

    const expectedState = getClonedObject<MainData>(state);

    expectedState.activeOffer = fakeOffer;
    expect(mainData.reducer(state, { type: setActiveOffer.type, payload: fakeOffer }))
      .toEqual(expectedState);

  });
});
