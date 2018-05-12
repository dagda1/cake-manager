import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import '../../../../types';
import '../types';

declare var module: any;

const configureStore = (initialState: Object) => {
  const middlewares: any[] = [];
  const enhancers = middlewares.map(a => applyMiddleware(a));

  const getComposeFunc = () => {
    if (process.env.BROWSER && __DEV__) {
      const { composeWithDevTools } = require('redux-devtools-extension');
      return composeWithDevTools;
    }

    return compose;
  };

  const composeFunc = getComposeFunc();
  const composedEnhancers = composeFunc.apply(null, enhancers);

  const store = createStore(reducers, initialState, composedEnhancers);

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