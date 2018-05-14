import { cakesReducer } from './cakes';
import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import { uiReducer } from './ui';

export const reducers = combineReducers({ cakes: cakesReducer, ui: uiReducer, form });
