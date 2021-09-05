import React from 'react';

import Switch from '../components/Switch';

export default {
  title: '數據輸入元件/Switch',
  component: Switch,
};

const Template = (args) => <Switch {...args} />;

export const Default = Template.bind({});

export const CustomColor = Template.bind({});
CustomColor.args = {
  isChecked: true,
  themeColor: '#ffc107',
};

export const DisabledSwitch = Template.bind({});
DisabledSwitch.args = {
  isChecked: true,
  isDisabled: true,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: 'small',
};

export const SwitchWithChildrenLabel = Template.bind({});
SwitchWithChildrenLabel.args = {
  checkedChildren: '開啟',
  unCheckedChildren: '關閉',
};
