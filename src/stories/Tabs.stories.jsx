import React, { useState } from 'react';

import Tabs from '../components/Tabs';

export default {
  title: '導航元件 /Tabs',
  component: Tabs,
};

const tabOptions = [
  {
    value: 'item-one',
    label: 'ITEM ONE',
  },
  {
    value: 'item-two',
    label: 'ITEM TWO',
  },
  {
    value: 'item-three',
    label: 'ITEM THREE',
  },
  {
    value: 'item-four',
    label: 'ITEM FOUR',
  },
];

const Template = () => {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <Tabs
      value={selectedValue}
      options={tabOptions}
      onChange={(value) => setSelectedValue(value)}
    />
  );
};

export const Default = Template.bind({});
