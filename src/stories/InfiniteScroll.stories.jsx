import React from 'react';

import InfiniteScroll from '../components/InfiniteScroll';

export default {
  title: '數據展示元件/InfiniteScroll',
  component: InfiniteScroll,
};

const Template = (args) => <InfiniteScroll {...args} />;

export const Default = Template.bind({});
Default.args = {};
