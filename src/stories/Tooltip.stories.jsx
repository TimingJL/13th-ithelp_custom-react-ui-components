import React, { useState } from 'react';
import styled from 'styled-components';

import Tooltip from '../components/Tooltip';
import Button from '../components/Button';
import Switch from '../components/Switch';

export default {
  title: '數據展示元件/Tooltip',
  component: Tooltip,
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

const PlacementWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const TemplateWithColorPicker = (args) => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);

  return (
    <SpaceBetween>
      <Tooltip
        {...args}
        themeColor={pickedColor}
      >
        <Button variant="outlined">Custom Color</Button>
      </Tooltip>
      <input
        type="color"
        value={pickedColor}
        onChange={(event) => setPickedColor(event.target.value)}
        style={{ marginRight: 8 }}
      />
    </SpaceBetween>
  );
};

const TemplateShowArrow = (args) => {
  const [showArrow, setShowArrow] = useState(true);

  return (
    <SpaceBetween>
      <Tooltip
        {...args}
        showArrow={showArrow}
      >
        <Button variant="outlined">Show Arrow</Button>
      </Tooltip>
      <Switch
        isChecked={showArrow}
        checkedChildren="有箭頭"
        unCheckedChildren="沒箭頭"
        onChange={(value) => setShowArrow(value)}
      />
    </SpaceBetween>
  );
};

const TemplatePlacement = (args) => (
  <PlacementWrapper>
    <Row>
      <Tooltip {...args} placement="top-left"><Button variant="outlined">Top Left</Button></Tooltip>
      <Tooltip {...args} placement="top"><Button variant="outlined">Top</Button></Tooltip>
      <Tooltip {...args} placement="top-right"><Button variant="outlined">Top Right</Button></Tooltip>
    </Row>
    <SpaceBetween>
      <Tooltip {...args} placement="right-top"><Button variant="outlined">Right Top</Button></Tooltip>
      <Tooltip {...args} placement="left-top"><Button variant="outlined">Left Top</Button></Tooltip>
    </SpaceBetween>
    <SpaceBetween>
      <Tooltip {...args} placement="right"><Button variant="outlined">Right</Button></Tooltip>
      <Tooltip {...args} placement="left"><Button variant="outlined">Left</Button></Tooltip>
    </SpaceBetween>
    <SpaceBetween>
      <Tooltip {...args} placement="right-bottom"><Button variant="outlined">Right Bottom</Button></Tooltip>
      <Tooltip {...args} placement="left-bottom"><Button variant="outlined">Left Bottom</Button></Tooltip>
    </SpaceBetween>
    <Row>
      <Tooltip {...args} placement="bottom-left"><Button variant="outlined">Bottom Left</Button></Tooltip>
      <Tooltip {...args} placement="bottom"><Button variant="outlined">Bottom</Button></Tooltip>
      <Tooltip {...args} placement="bottom-right"><Button variant="outlined">Bottom Right</Button></Tooltip>
    </Row>
  </PlacementWrapper>
);

const defaultArgs = {
  children: 'Tooltip',
  content: (
    <div>
      <div>Tooltip</div>
      <div>Awesome!</div>
    </div>
  ),
};

export const Default = TemplatePlacement.bind({});
Default.args = {
  ...defaultArgs,
};

export const CustomColor = TemplateWithColorPicker.bind({});
CustomColor.args = {
  ...defaultArgs,
};

export const ShowArrow = TemplateShowArrow.bind({});
ShowArrow.args = {
  ...defaultArgs,
};
