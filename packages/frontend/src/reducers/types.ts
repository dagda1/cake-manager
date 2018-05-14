import { CakeProps } from '../../../../types';
import { SetCakes, AddCake } from './cakes';
import { SetLoading } from './ui';

export enum ActionTypes {
  SetCakes = 'SET_CAKES',
  SetLoading = 'SET_LOADING',
  AddCake = 'ADD_CAKE'
}

export interface CakesState {
  cakes: CakeProps[];
}

export interface UiState {
  isLoading?: boolean;
}

export interface State {
  cakes: CakeProps[];
  ui?: UiState;
}

// uniion of all Cake actions
export type CakeActions = SetCakes | AddCake | SetLoading;
