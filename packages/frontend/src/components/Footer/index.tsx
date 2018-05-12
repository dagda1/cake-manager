import * as React from 'react';
import { Wrap, Layout, GelItem } from '@cutting/react-gel';

const styles = require('./Footer.scss');

export const Footer: React.SFC = () => (
  <footer role="contentinfo">
    <Wrap className="wrapper">
      <Layout center>
        <GelItem>
          <div className={styles.placeholder}>Footer</div>
        </GelItem>
      </Layout>
    </Wrap>
  </footer>
);
