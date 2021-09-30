import React from 'react';

import Breadcrumb from '../components/Breadcrumb';

export default {
  title: '導航元件/Breadcrumb',
  component: Breadcrumb,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Breadcrumb',
};
