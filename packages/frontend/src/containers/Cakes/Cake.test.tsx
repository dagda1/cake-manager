import * as React from 'react';
import { wrapComponentInReduxForTesting, dummyCakes, selectElement } from '../../tests';
import { Cakes, CakesContainerProps } from '.';
import { mount } from 'enzyme';
import { CakeForm } from '../CakeForm';
import { Modal } from '@cutting/component-library';
import { Cake } from '../../components/Cake';

const wrap = (props: CakesContainerProps) => wrapComponentInReduxForTesting(Cakes, props, { cakes: dummyCakes });

describe('<Cakes />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = wrap({ cakes: dummyCakes, isLoading: false });
  });

  it('should render a cakes form', () => {
    expect(wrapper.find(CakeForm)).toHaveLength(1);
  });

  it('should render a Modal', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should show modal on selection', () => {
    expect(wrapper.find(Modal).props().open).toBe(false); // precondition

    selectElement(wrapper, 'modal-button').simulate('click');

    expect(wrapper.find(Modal).props().open).toBe(true);
  });

  it('should show a list of cakes', () => {
    expect(wrapper.find(Cake)).toHaveLength(1);
  });
});
