import * as React from 'react';
import { Layout, GelItem } from '@cutting/react-gel';

const styles = require('./Footer.scss');

export const Footer: React.SFC = () => (
  <footer role="contentinfo">
    <Layout center>
      <GelItem>
        <div className={styles.placeholder}>Footer</div>
      </GelItem>
    </Layout>
  </footer>
);
