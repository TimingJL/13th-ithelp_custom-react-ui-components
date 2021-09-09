import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Radio from '../components/Radio';
import RadioGroup from '../components/Radio/RadioGroup';

export default {
  title: '數據輸入元件/Radio',
  component: Radio,
};

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Template = (args) => <Radio {...args} />;

const TemplateWithState = (args) => {
  const { isChecked: defaultChecked } = args;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleOnClick = () => {
    setIsChecked(true);
  };

  return (
    <RadioWrapper>
      <Radio
        {...args}
        isChecked={isChecked}
        onClick={handleOnClick}
      />
      <Button
        variant="outlined"
        onClick={() => setIsChecked(false)}
      >
        重設
      </Button>
    </RadioWrapper>
  );
};

const TemplateWithRadioGroup = (args) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <RadioGroup
      onChange={handleOnChange}
      value={selectedValue}
      columns={2}
      style={{
        maxWidth: 500,
      }}
      {...args}
    >
      <Radio value="male">Male</Radio>
      <Radio value="female">Female</Radio>
      <Radio value="others">Others</Radio>
    </RadioGroup>
  );
};

export const Default = TemplateWithState.bind({});
Default.args = {
  children: 'Radio',
};

export const CustomizeColor = Template.bind({});
CustomizeColor.args = {
  children: 'Radio',
  themeColor: '#FE6B8B',
  isChecked: true,
};

export const DisabledRadio = Template.bind({});
DisabledRadio.args = {
  isDisabled: true,
  children: 'Radio',
};

export const WithRadioGroup = TemplateWithRadioGroup.bind({});
