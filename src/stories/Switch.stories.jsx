/* eslint-disable no-unused-vars */
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
  argTypes: {
    themeColor: { control: 'color' },
  },
};

export const Default = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return <Switch isChecked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />;
};

export const CustomColor = () => {
  const [isChecked, setIsChecked] = React.useState(true);
  return <Switch isChecked={isChecked} onChange={() => setIsChecked((prev) => !prev)} themeColor="#ffc107" />;
};

export const DisabledSwitch = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Switch isChecked={false} isDisabled onChange={() => setIsChecked((prev) => !prev)} />
      <Switch isChecked isDisabled onChange={() => setIsChecked((prev) => !prev)} />
    </div>
  );
};

export const SwitchWithSize = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <SwitchGroup>
      <Switch
        size="small"
        isChecked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <Switch
        isChecked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
    </SwitchGroup>
  );
};

export const SwitchWithChildrenLabel = (args) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <SwitchGroup>
      <Switch
        checkedChildren="開啟"
        unCheckedChildren="關閉"
        isChecked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
      <Switch
        checkedChildren="開啟一個長度彈性的 Switch"
        unCheckedChildren="關閉一個長度彈性的 Switch"
        isChecked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
      />
    </SwitchGroup>
  );
};
