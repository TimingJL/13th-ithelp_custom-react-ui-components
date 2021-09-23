import React from 'react';

import Badge from '../components/Badge';

export default {
  title: '數據展示元件/Badge',
  component: Badge,
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Badge',
};
