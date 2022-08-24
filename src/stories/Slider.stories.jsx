import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Slider, { CustomSlider } from '../lib/components/Slider';

export default {
  title: '數據輸入元件/Slider',
  component: Slider,
};

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template = (args) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [value, setValue] = useState(args.defaultValue || 0);

  useEffect(() => {

  }, []);
  return (
    <SliderWrapper>
      <Slider
        {...args}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <span>{value}</span>
    </SliderWrapper>
  );
};

const TemplateCustom = (args) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [value, setValue] = useState(args.defaultValue || 0);

  useEffect(() => {

  }, []);
  return (
    <SliderWrapper>
      <CustomSlider
        {...args}
        onChange={(currentValue) => {
          setValue(currentValue.toFixed(2));
        }}
      />
      <span>{value}</span>
    </SliderWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  defaultValue: 50,
  themeColor: '#42f5c5',
};

export const WithStep = Template.bind({});
WithStep.args = {
  min: 0,
  max: 8,
  step: 2,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  defaultValue: 50,
};

export const HandmadeSlider = TemplateCustom.bind({});
HandmadeSlider.args = {
  // eslint-disable-next-line no-console
  onChange: (value) => console.log('value: ', value),
};
