require('../../assets/scss/global.scss');
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';
import { Cakes } from '../Cakes';

export interface AppProps {
  store: Store;
}

export class App extends React.Component<AppProps> {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ApplicationLayout>
          <Cakes />
        </ApplicationLayout>
      </Provider>
    );
  }
}
