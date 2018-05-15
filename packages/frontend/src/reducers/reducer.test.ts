import * as React from 'react';
import { cakesReducer, setCakes, addCake } from './cakes';
import { Store } from 'redux';
import { State } from './types';
import { createStoreForTesting, dummyCakes } from '../tests';

describe('cakes reducer', () => {
  let store: Store;

  beforeEach(() => {
    store = createStoreForTesting();
  });

  it('should change cakes state', () => {
    store.dispatch(setCakes(dummyCakes));

    expect(store.getState().cakes).toEqual(dummyCakes);
  });

  it('should add a cake', () => {
    store.dispatch(addCake(dummyCakes[0]));

    expect(store.getState().cakes).toEqual(dummyCakes);
  });
});
