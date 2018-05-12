import * as React from 'react';
import { hydrate } from 'react-dom';

import { App } from '../containers/App';
import configureStore from '../store';

export const root = document.getElementById('root');

const preloadedState = (window as any).__PRELOADED_STATE__;

const store = configureStore(preloadedState);

const render = (Component: React.ComponentClass, props: any) => {
  hydrate(<Component {...props} />, root);
};

render(App, { store });

if (module.hot && __DEV__) {
  module.hot.accept('../containers/App', () => {
    const App = require('../containers/App').default;
    render(App, { store });
  });
}
