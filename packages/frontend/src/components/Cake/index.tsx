import * as React from 'react';
import { CakeProps } from '../../../../../types';
import { Heading } from '@cutting/component-library';

const styles = require('./Cake.scss');

export const Cake: React.SFC<CakeProps> = ({ title, desc, image }: CakeProps) => (
  <div className={styles.container}>
    <Heading level={3}>{title}</Heading>
    <div>{desc}</div>
    <div className={styles.image__container}>
      <img src={image} alt={desc} />
    </div>
  </div>
);
