import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './sidebar';

describe('<Sidebar />', () => {
  test('renders', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});
