import * as React from 'react';
import { CakeProps } from '../../../../../types';
import { shallow } from 'enzyme';
import { Cake } from '.';
import { Heading } from '@cutting/component-library';
import { selectElement } from '../../tests';

const wrap = (props: CakeProps) => shallow(<Cake {...props} />);

describe('<Cake />', () => {
  it('should render a cake', () => {
    const cake: CakeProps = { title: 'title', desc: 'description', image: 'image' };

    const wrapper = wrap(cake);

    expect(
      wrapper
        .find(Heading)
        .dive()
        .text()
    ).toBe('title');

    expect(selectElement(wrapper, 'description').text()).toBe('description');

    expect(wrapper.find('img')).toHaveLength(1);
  });
});
