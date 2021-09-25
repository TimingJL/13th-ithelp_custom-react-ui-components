import React from 'react';

import Collapse from '../components/Collapse';

export default {
  title: '數據展示元件/Collapse',
  component: Collapse,
};

const Template = (args) => <Collapse {...args} />;

export const Default = Template.bind({});
Default.args = {};
