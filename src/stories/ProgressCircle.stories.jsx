/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';

import ProgressCircle from '../components/ProgressCircle';

export default {
  title: '反饋元件/ProgressCircle',
  component: ProgressCircle,
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 20px;
`;

const ResizeProgressCircle = styled(ProgressCircle)`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

const Template = (args) => <ProgressCircle {...args} />;

const TemplateDiffValueDemo = (args) => (
  <Container>
    <ProgressCircle {...args} />
    <ProgressCircle {...args} value={25} />
    <ProgressCircle {...args} value={50} />
    <ProgressCircle {...args} value={75} />
    <ProgressCircle {...args} value={100} />
    <ProgressCircle {...args} value={120} />
  </Container>
);

const TemplateGradientTrack = () => {
  const strokeColor = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <Container>
      <ProgressCircle strokeColor={strokeColor} />
      <ProgressCircle strokeColor={strokeColor} value={25} />
      <ProgressCircle strokeColor={strokeColor} value={50} />
      <ProgressCircle strokeColor={strokeColor} value={75} />
      <ProgressCircle strokeColor={strokeColor} value={100} />
      <ProgressCircle strokeColor={strokeColor} value={120} />
    </Container>
  );
};

const TemplateCustomColor = (args) => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
        />
      </div>
      <Container>
        <ProgressCircle {...args} themeColor={pickedColor} />
        <ProgressCircle {...args} value={25} themeColor={pickedColor} />
        <ProgressCircle {...args} value={50} themeColor={pickedColor} />
        <ProgressCircle {...args} value={75} themeColor={pickedColor} />
        <ProgressCircle {...args} value={100} themeColor={pickedColor} />
        <ProgressCircle {...args} value={120} themeColor={pickedColor} />
      </Container>
    </div>
  );
};

const TemplateDiffSize = (args) => (
  <Container>
    <ResizeProgressCircle {...args} $size={60} />
    <ResizeProgressCircle {...args} />
    <ResizeProgressCircle {...args} $size={200} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  value: 20,
};

export const LimitValue = TemplateDiffValueDemo.bind({});

export const CustomColor = TemplateCustomColor.bind({});

export const GradientTrack = TemplateGradientTrack.bind({});

export const CounterClockwise = TemplateDiffValueDemo.bind({});
CounterClockwise.args = {
  isClockwise: false,
};

export const Size = TemplateDiffSize.bind({});
Size.args = {
  value: 87,
};
