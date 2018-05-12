require('../../assets/scss/global.scss');
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';

export interface AppProps {
  store: Store;
}

export class App extends React.Component<AppProps> {
  render() {
    const { store, children } = this.props;

    return (
      <Provider store={store}>
        <ApplicationLayout>{children}</ApplicationLayout>
      </Provider>
    );
  }
}
