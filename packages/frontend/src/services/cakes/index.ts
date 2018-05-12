import { CakeApiUrl } from '../../config';
import { CakeProps } from '../../../../../types';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const getCakes = async (): Promise<CakeProps[]> => {
  const response = await fetch(CakeApiUrl);

  return await response.json();
};
