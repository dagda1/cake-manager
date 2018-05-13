import { State } from '../reducers';

// I would normally use something like reselect which memoises the result of the function
// to stop thrashing on mapStateToProps
// but as the state is so simple there is really no point.
// All state selections should be done through selectors whether the memoise or not
export const cakesSelector = (state: State) => state.cakes;

export const isLoadingSelector = (state: State) => state.isLoading;
