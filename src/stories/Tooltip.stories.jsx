import React from 'react';

import Tooltip from '../components/Tooltip';

export default {
  title: '數據展示元件/Tooltip',
  component: Tooltip,
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Tooltip',
};
