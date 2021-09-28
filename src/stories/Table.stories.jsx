import React from 'react';

import Table from '../components/Table';

export default {
  title: '數據展示元件/Table',
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {};
