import HandlerBuilder from 'handler-builder';
import { CakeActions, State, CakeActionTypes } from '.';

export default (initialState: State) =>
  new HandlerBuilder<CakeActionTypes>(
    (state = initialState, action: CakeActions) => action.type,
    (state = initialState, action: CakeActions) => state
  );
