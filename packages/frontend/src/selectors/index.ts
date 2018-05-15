import { createSelector } from 'reselect';
import { State, UiState } from '../reducers/types';

export const cakesSelector = (state: State) => state.cakes;

export const uiSelector = (state: State) => state.ui;

export const isLoadingSelector = createSelector(uiSelector, (ui: UiState) => ui.isLoading);

export default {
  cakesSelector,
  isLoadingSelector
};
