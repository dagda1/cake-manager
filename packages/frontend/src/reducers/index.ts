import { combineReducers, Action } from 'redux';
import reducerBuilder from './builder';
import { CakeProps } from '../../../../types';

export enum CakeActionTypes {
  SetCakes = 'SET_CAKES'
}

export interface SetCakes extends Action {
  type: CakeActionTypes.SetCakes;
  payload: { cakes: CakeProps[] };
}

export const setCakes = (cakes: CakeProps[]): SetCakes => ({ type: CakeActionTypes.SetCakes, payload: { cakes } });

// uniion of all Cake actions
export type CakeActions = SetCakes;

export type State = {
  cakes: CakeProps[];
};

const initialState: State = {
  cakes: []
};

const cakesReducer = reducerBuilder(initialState).build({
  [CakeActionTypes.SetCakes]: (state: State, action: SetCakes) => ({
    ...state,
    ...{ cakes: action.payload.cakes }
  })
});

export default combineReducers({
  cakes: cakesReducer
});
