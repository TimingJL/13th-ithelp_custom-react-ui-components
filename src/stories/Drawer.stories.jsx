import React from 'react';

import Drawer from '../components/Drawer';

export default {
  title: '導航元件/Drawer',
  component: Drawer,
};

const Template = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Drawer',
};
