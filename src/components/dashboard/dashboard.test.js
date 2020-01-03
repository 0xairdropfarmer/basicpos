import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';

describe('<Dashboard />', () => {
  test('renders', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
