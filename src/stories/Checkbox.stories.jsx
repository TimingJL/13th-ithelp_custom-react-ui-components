import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

export default {
  title: '數據輸入元件/Checkbox',
  component: Checkbox,
  argTypes: {
    themeColor: { control: 'color' },
  },
};

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Template = (args) => <Checkbox {...args} />;

const TemplateWithState = (args) => {
  const { isChecked: defaultChecked } = args;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleOnClick = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <RadioWrapper>
      <Checkbox
        {...args}
        isChecked={isChecked}
        onClick={handleOnClick}
      />
    </RadioWrapper>
  );
};

const TemplateWithColorPicker = (args) => {
  const { isChecked: defaultChecked } = args;
  const defaultColor = '#FE6B8B';
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [pickedColor, setPickedColor] = useState(defaultColor);

  const handleOnClick = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <RadioWrapper>
      <Checkbox
        {...args}
        themeColor={pickedColor}
        isChecked={isChecked}
        onClick={handleOnClick}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button
          variant="outlined"
          themeColor={pickedColor}
          onClick={() => {
            setIsChecked(false);
          }}
        >
          重設
        </Button>
      </div>
    </RadioWrapper>
  );
};

export const Default = TemplateWithState.bind({});
Default.args = {
  children: 'Checkbox',
};

export const CustomizeColor = TemplateWithColorPicker.bind({});
CustomizeColor.args = {
  children: 'Checkbox',
  isChecked: true,
};

export const DisabledCheckbox = Template.bind({});
DisabledCheckbox.args = {
  isDisabled: true,
  children: 'Checkbox',
};
