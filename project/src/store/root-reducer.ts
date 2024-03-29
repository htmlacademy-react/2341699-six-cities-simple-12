import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../common/constants';
import { mainData } from './main-data/main-data';
import { propertyData } from './property-data/property-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.MainData]: mainData.reducer,
  [NameSpace.PropertyData]: propertyData.reducer,
});
