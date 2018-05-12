import { createStore, applyMiddleware, compose, Store } from 'redux';
import reducers, { State } from '../reducers';
import '../../../../types';
import '../types';
import { createLogger } from 'redux-logger';

declare var module: any;

const configureStore = (initialState: Object): Store<State> => {
  const middlewares: any[] = [];
  const enhancers = middlewares.map(a => applyMiddleware(a));
  const logger = createLogger({});

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);

    if (typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const store = createStore(reducers, initialState, compose(...enhancers));

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

export default (initialState: Object = {}) => {
  return configureStore(initialState);
};
