import HandlerBuilder from 'handler-builder';
import { CakeActions, State, ActionTypes } from '.';

export default (initialState: State) =>
  new HandlerBuilder<ActionTypes>(
    (state = initialState, action: CakeActions) => action.type,
    (state = initialState, action: CakeActions) => state
  );
