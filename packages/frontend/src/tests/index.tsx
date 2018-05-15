import * as React from 'react';
import { ShallowWrapper, ReactWrapper, mount } from 'enzyme';
import { combineReducers } from 'redux';
import { Middleware } from 'redux';
import { createStore } from 'redux';
import { State } from '../reducers/types';
import { merge } from 'lodash';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import { cakesReducer } from '../reducers/cakes';
import { uiReducer } from '../reducers/ui';
import { CakeProps } from '../../../../types';

export type CommonWrapper<T = {}, U = {}> = ShallowWrapper<T, U> | ReactWrapper<T, U>;

export const findElement = <T, U>(wrapper: CommonWrapper<T, U>, name: string) =>
  wrapper.find(`[name="${name}"]`).hostNodes();

export const selectElement = <T, U>(wrapper: CommonWrapper<T, U>, name: string) =>
  wrapper.find(`[data-selector="${name}"]`).hostNodes();

export const setInput = (wrapper: ReactWrapper) => (name: string, text: string) => {
  const input = findElement(wrapper, name);
  input.simulate('change', { target: { value: text } });
  input.simulate('blur');
};

export const dummyCakes: CakeProps[] = [{ title: 'title', desc: 'desc', image: 'img' }];

export const findSubmitButton = (wrapper: ReactWrapper) => wrapper.find('button[type="submit"]');

export const clickSubmitButton = (wrapper: ReactWrapper) => findSubmitButton(wrapper).simulate('submit');

const getReducers = () => {
  // don't screw up mocking
  const form = require('redux-form').reducer;

  const reducers: any = {
    form,
    cakes: cakesReducer,
    ui: uiReducer
  };

  return combineReducers(reducers);
};

export const getInitialState = (stateOverride: Partial<State> = {}): State =>
  merge({}, { cakes: [], ui: { isLoading: false } }, stateOverride);

export const createStoreForTesting = (stateOverride?: Partial<State>) => {
  const initialState = getInitialState(stateOverride);
  const reducer = getReducers();

  const middlewares: Middleware[] = [thunk];
  const enhancers = middlewares.map(a => applyMiddleware(a));

  return createStore(reducer, initialState, compose(...enhancers));
};

export const wrapComponentInReduxForTesting = (
  Comp: React.ComponentType<any>,
  props = {},
  stateOverride: Partial<State> = {}
) =>
  mount(
    <Provider store={createStoreForTesting(stateOverride)}>
      <Comp {...props} />
    </Provider>
  );
