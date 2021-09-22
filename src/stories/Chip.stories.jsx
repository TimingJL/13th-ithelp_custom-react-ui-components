import React from 'react';

import Chip from '../components/Chip';

export default {
  title: '數據展示元件/Chip',
  component: Chip,
};

const Template = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Chip',
};
