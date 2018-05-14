import { CakeApiUrl } from '../../config';
import { CakeProps } from '../../../../../types';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const getCakes = async (): Promise<CakeProps[]> => {
  const response = await fetch(CakeApiUrl);

  return await response.json();
};

export const persistCake = async (cake: CakeProps) => {
  await fetch('/cakes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cake)
  });
};
