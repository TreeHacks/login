import { combineReducers, Reducer } from 'redux';

import auth from './auth/reducer';
import base from './base/reducer';

export const reducers: Reducer = combineReducers({
  auth,
  base
});
