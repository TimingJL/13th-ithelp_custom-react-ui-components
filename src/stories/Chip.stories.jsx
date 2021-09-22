import React, { useState } from 'react';
import styled from 'styled-components';
import FaceIcon from '@material-ui/icons/Face';
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

// eslint-disable-next-line react/prop-types
const TemplateCustomColor = ({ defaultColor, ...args }) => {
  const [pickedColor, setPickedColor] = useState(defaultColor || '#FE6B8B');

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

export const WithIcon = TemplateCustomColor.bind({});
WithIcon.args = {
  icon: <FaceIcon />,
  defaultColor: '#1976d2',
};
