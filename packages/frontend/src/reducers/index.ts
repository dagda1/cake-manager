import { combineReducers, Action } from 'redux';
import reducerBuilder from './builder';
import { CakeProps } from '../../../../types';
import { reducer as form } from 'redux-form';
import { Dispatch } from 'react-redux';
import { persistCake } from '../services/cakes';

export enum ActionTypes {
  SetCakes = 'SET_CAKES',
  SetLoading = 'SET_LOADING',
  AddCake = 'ADD_CAKE'
}

export interface SetCakes extends Action {
  type: ActionTypes.SetCakes;
  payload: { cakes: CakeProps[] };
}

export const setCakes = (cakes: CakeProps[]): SetCakes => ({ type: ActionTypes.SetCakes, payload: { cakes } });

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

export interface AddCake extends Action {
  type: ActionTypes.AddCake;
  payload: {
    cake: CakeProps;
  };
}

export const addCake = (cake: CakeProps): AddCake => ({ type: ActionTypes.AddCake, payload: { cake } });

// would normally use redux-saga or redux-loop or have some thunk middleware to
// remove the boilerplate from api callas but going for thfunks for simplicity
export const createNewCake = (cake: CakeProps) => async (dispatch: Dispatch<State>) => {
  setLoading(true);

  addCake(cake);

  try {
    await persistCake(cake);
  } catch (err) {
    // TODO: handle api errors.  Put something in the redux state or whaterver.
    // Leaving for now
    console.log(err);
  }

  setLoading(false);
};

// uniion of all Cake actions
export type CakeActions = SetCakes | AddCake | SetLoading;

export type State = {
  cakes: CakeProps[];
  isLoading?: boolean;
};

const initialState: State = {
  cakes: [],
  isLoading: false
};

const cakesReducer = reducerBuilder(initialState).build({
  [ActionTypes.SetCakes]: (state: State, action: SetCakes) => ({
    ...state,
    cakes: action.payload.cakes
  }),

  [ActionTypes.AddCake]: (state: State, action: AddCake) => ({
    ...state,
    cakes: [action.payload.cake, ...(state.cakes || [])]
  }),

  [ActionTypes.SetLoading]: (state: State, action: SetLoading) => ({
    ...state,
    isLoading: action.payload.isLoading
  })
});

export default combineReducers({
  cakes: cakesReducer,
  form
});
