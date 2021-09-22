import React, { useState } from 'react';
import styled from 'styled-components';

import Chip from '../components/Chip';

export default {
  title: '數據展示元件/Chip',
  component: Chip,
};

const VariantGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Template = (args) => <Chip {...args} />;
const TemplateVariant = (args) => (
  <VariantGroup>
    <Chip {...args} label="Contained style" />
    <Chip {...args} label="Outlined style" variant="outlined" />
  </VariantGroup>
);
const TemplateCustomColor = (args) => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);

  return (
    <SpaceBetween>
      <VariantGroup>
        <Chip {...args} themeColor={pickedColor} label="Contained style" />
        <Chip {...args} themeColor={pickedColor} label="Outlined style" variant="outlined" />
      </VariantGroup>
      <input
        type="color"
        value={pickedColor}
        onChange={(event) => setPickedColor(event.target.value)}
      />
    </SpaceBetween>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Chip',
};

export const Variant = TemplateVariant.bind({});
Variant.args = {};

export const CustomColor = TemplateCustomColor.bind({});
CustomColor.args = {
};
