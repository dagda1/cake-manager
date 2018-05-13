import * as React from 'react';
import { Layout, GelItem } from '@cutting/react-gel';
import { Heading } from '@cutting/component-library';

const styles = require('./Menu.scss');

export const Menu: React.SFC = () => (
  <nav className={styles.container}>
    <Layout center>
      <GelItem>
        <ul>
          <li>
            <Heading level={1}>Cakes R Us</Heading>
          </li>
        </ul>
      </GelItem>
    </Layout>
  </nav>
);
