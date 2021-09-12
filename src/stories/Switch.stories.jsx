import React from 'react';
import styled from 'styled-components';

import Switch from '../components/Switch';

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 20px;
  }
`;

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

const TemplateWithDiffSize = (args) => (
  <SwitchGroup>
    <Switch
      size="small"
      {...args}
    />
    <Switch {...args} />
  </SwitchGroup>
);

export const SwitchWithSize = TemplateWithDiffSize.bind({});

const TemplateWithLabel = (args) => (
  <SwitchGroup>
    <Switch
      checkedChildren="開啟"
      unCheckedChildren="關閉"
      {...args}
    />
    <Switch
      checkedChildren="開啟一個長度彈性的 Switch"
      unCheckedChildren="關閉一個長度彈性的 Switch"
      {...args}
    />
  </SwitchGroup>
);

export const SwitchWithChildrenLabel = TemplateWithLabel.bind({});
