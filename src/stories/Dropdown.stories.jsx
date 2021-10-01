import React from 'react';

import Dropdown from '../components/Dropdown';

export default {
  title: '導航元件/Dropdown',
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Dropdown',
};
