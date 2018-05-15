import * as React from 'react';
import { CakeForm, CakeFormProps } from '.';
import {
  wrapComponentInReduxForTesting,
  dummyCakes,
  selectElement,
  findElement,
  findSubmitButton,
  clickSubmitButton,
  setInput
} from '../../tests';
import { ReactWrapper } from 'enzyme';
import { Form } from 'redux-form';

const wrap = (props: Partial<CakeFormProps> = {}) => wrapComponentInReduxForTesting(CakeForm, props);

const findForm = (wrapper: ReactWrapper): any => wrapper.find('Form').at(0);

describe('<CakeForm />', () => {
  it('should render a cake form', () => {
    const wrapper = wrap();

    expect(findElement(wrapper, 'title')).toHaveLength(1);
    expect(findElement(wrapper, 'desc')).toHaveLength(1);
    expect(findElement(wrapper, 'image')).toHaveLength(1);

    expect(findSubmitButton(wrapper)).toHaveLength(1);
  });

  it('should be initially invalid', () => {
    const wrapper = wrap();

    clickSubmitButton(wrapper);

    expect(findForm(wrapper).props().invalid).toBe(true);
  });

  it('should submit form', () => {
    const addCake = jest.fn().mockReturnValue({ type: 'blah' });

    const wrapper = wrap({ addCake });

    const inputSetter = setInput(wrapper);

    inputSetter('title', 'blah');
    inputSetter('desc', 'blah');
    inputSetter('image', 'blah');

    clickSubmitButton(wrapper);

    wrapper.update();

    expect(findForm(wrapper).props().valid).toBe(true);

    expect(addCake).toHaveBeenCalled();
  });
});
