import { Action } from 'redux';
import reducerBuilder from './builder';
import { CakeProps } from '../../../../types';
import { Dispatch } from 'react-redux';
import { persistCake } from '../services/cakes';
import { ActionTypes, CakesState } from './types';
import { setLoading } from './ui';
import { reset } from 'redux-form';
import { CakeFormName } from '../config';

export interface SetCakes extends Action {
  type: ActionTypes.SetCakes;
  payload: { cakes: CakeProps[] };
}

export const setCakes = (cakes: CakeProps[]): SetCakes => ({ type: ActionTypes.SetCakes, payload: { cakes } });

export interface AddCake extends Action {
  type: ActionTypes.AddCake;
  payload: {
    cake: CakeProps;
  };
}

export const addCake = (cake: CakeProps): AddCake => ({ type: ActionTypes.AddCake, payload: { cake } });

// would normally use redux-saga or redux-loop or have some thunk middleware to
// remove the boilerplate from api callas but going for thfunks for simplicity
export const createNewCake = (cake: CakeProps) => async (dispatch: Dispatch<any>) => {
  dispatch(setLoading(true));

  dispatch(addCake(cake));

  try {
    await persistCake(cake);
  } catch (err) {
    // TODO: handle api errors.  Put something in the redux state or whaterver.
    // Leaving for now
    console.log(err);
  }

  dispatch(setLoading(false));

  dispatch(reset(CakeFormName));
};

const initialState: CakesState = {
  cakes: []
};

export const cakesReducer = reducerBuilder(initialState).build({
  [ActionTypes.SetCakes]: (state: any, action: SetCakes) => action.payload.cakes,

  [ActionTypes.AddCake]: (state: any, action: AddCake) => [action.payload.cake, ...state]
});
