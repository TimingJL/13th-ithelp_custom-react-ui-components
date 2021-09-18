import React from 'react';

import Slider, { CustomSlider } from '../components/Slider';

export default {
  title: '數據輸入元件/Slider',
  component: Slider,
};

const TemplateCustom = (args) => <CustomSlider {...args} />;

const Template = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  themeColor: '#42f5c5',
};

export const HandmadeSlider = TemplateCustom.bind({});
HandmadeSlider.args = {
  // eslint-disable-next-line no-console
  onChange: (value) => console.log('value: ', value),
};
