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

export const HandmadeSlider = TemplateCustom.bind({});
HandmadeSlider.args = {
  // eslint-disable-next-line no-console
  onChange: (value) => console.log('value: ', value),
};
