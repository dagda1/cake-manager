import HandlerBuilder from 'handler-builder';
import { CakesState, UiState, ActionTypes, CakeActions } from './types';

export default (initialState: CakesState | UiState) =>
  new HandlerBuilder<ActionTypes>(
    (state = initialState, action: CakeActions) => action.type,
    (state = initialState, action: CakeActions) => state
  );
