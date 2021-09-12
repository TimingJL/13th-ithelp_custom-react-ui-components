import React from 'react';

import Checkbox from '../components/Checkbox';

export default {
  title: '數據輸入元件/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'checkbox',
};
