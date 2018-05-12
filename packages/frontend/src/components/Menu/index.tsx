import * as React from 'react';
import { Wrap, Layout, GelItem } from '@cutting/react-gel';
import { Heading } from '@cutting/component-library';
import * as cs from 'classnames';

const styles = require('./Menu.scss');

export const Menu: React.SFC = () => (
  <nav className={cs(styles.container, 'wrapper')}>
    <Wrap>
      <Layout center>
        <GelItem>
          <ul>
            <li>
              <Heading level={1}>Cakes R us</Heading>
            </li>
          </ul>
        </GelItem>
      </Layout>
    </Wrap>
  </nav>
);
