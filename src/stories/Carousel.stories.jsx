import React from 'react';

import Carousel from '../components/Carousel';

export default {
  title: '數據展示元件/Carousel',
  component: Carousel,
};

const Template = (args) => <Carousel {...args} />;

export const Default = Template.bind({});
