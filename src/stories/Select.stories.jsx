import React, { useState } from 'react';

import Select from '../components/Select';

export default {
  title: '導航元件/Select',
  component: Select,
};

const options = [
  {
    value: 'all',
    label: '我全都要',
  },
  {
    value: 'AZ',
    label: 'AZ 疫苗',
  },
  {
    value: 'BNT',
    label: 'BNT 疫苗',
  },
  {
    value: 'Moderna',
    label: '莫德納疫苗',
  },
  {
    value: 'Vaccine',
    label: '高端疫苗',
  },
];

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Select
      {...args}
      value={selectedValue}
      onSelect={(value) => setSelectedValue(value)}
      placeholder="請選擇預約疫苗"
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  isDisable: true,
};

export const Loading = Template.bind({});
Loading.args = {
  options,
  isLoading: true,
};
