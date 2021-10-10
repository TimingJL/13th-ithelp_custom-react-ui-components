/* eslint-disable react/destructuring-assignment */
import React from 'react';

import ProgressCircle from '../components/ProgressCircle';

export default {
  title: '反饋元件/ProgressCircle',
  component: ProgressCircle,
};

const Template = (args) => <ProgressCircle {...args} />;

export const Default = Template.bind({});
