import React from 'react';

import Card from '../components/Card';

export default {
  title: '數據展示元件/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {};
