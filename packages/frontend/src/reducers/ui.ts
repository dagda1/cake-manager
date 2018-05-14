import { Action } from 'redux';
import reducerBuilder from './builder';
import { ActionTypes, UiState } from './types';

export interface SetLoading extends Action {
  type: ActionTypes.SetLoading;
  payload: {
    isLoading: boolean;
  };
}

export const setLoading = (isLoading: boolean): SetLoading => ({
  type: ActionTypes.SetLoading,
  payload: { isLoading }
});

const initialState = { isLoading: false };

export const uiReducer = reducerBuilder(initialState).build({
  [ActionTypes.SetLoading]: (state: UiState, action: SetLoading) => ({
    ...state,
    isLoading: action.payload.isLoading
  })
});
