import React from 'react';

import Rate from '../components/Rate';

export default {
  title: '數據輸入元件/Rate',
  component: Rate,
};

const Template = (args) => <Rate {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Rate',
};
