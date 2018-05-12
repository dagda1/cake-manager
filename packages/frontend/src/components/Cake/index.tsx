import * as React from 'react';
import { CakeProps } from '../../../../../types';

const styles = require('./Cake.scss');

export const Cake: React.SFC<CakeProps> = (props: CakeProps) => <div className={styles.container}>{props.title}</div>;
