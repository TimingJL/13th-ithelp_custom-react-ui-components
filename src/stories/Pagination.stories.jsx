import React from 'react';

import Pagination from '../components/Pagination';

export default {
  title: '導航元件/Pagination',
  component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
