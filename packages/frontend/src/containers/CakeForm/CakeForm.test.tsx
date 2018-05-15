import * as React from 'react';
import { CakeForm, CakeFormProps } from '.';
import { wrapComponentInReduxForTesting, dummyCakes, selectElement } from '../../tests';

const wrap = (props: CakeFormProps) => wrapComponentInReduxForTesting(CakeForm, props);

describe('<CakeForm />', () => {
  it('should render a cake form', () => {});
});
