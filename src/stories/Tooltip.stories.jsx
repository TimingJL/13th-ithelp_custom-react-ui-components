import React, { useState } from 'react';
import styled from 'styled-components';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '../lib/components/Tooltip';
import Button from '../lib/components/Button';
import Switch from '../lib/components/Switch';

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
    <SpaceBetween style={{ height: 160 }}>
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
    <SpaceBetween style={{ height: 160 }}>
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
        onChange={() => setShowArrow((prev) => !prev)}
      />
    </SpaceBetween>
  );
};

const TemplatePlacement = (args) => (
  <PlacementWrapper>
    <Row>
      <Tooltip {...args} placement="bottom-left"><Button variant="outlined">Bottom Left</Button></Tooltip>
      <Tooltip {...args} placement="bottom"><Button variant="outlined">Bottom</Button></Tooltip>
      <Tooltip {...args} placement="bottom-right"><Button variant="outlined">Bottom Right</Button></Tooltip>
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
      <Tooltip {...args} placement="top-left"><Button variant="outlined">Top Left</Button></Tooltip>
      <Tooltip {...args} placement="top"><Button variant="outlined">Top</Button></Tooltip>
      <Tooltip {...args} placement="top-right"><Button variant="outlined">Top Right</Button></Tooltip>
    </Row>
  </PlacementWrapper>
);

const Template = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 160 }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      挑戰 iThome 鐵人賽
      <Tooltip
        {...args}
        content="喚醒心中最強大的鐵人"
      >
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 4 }}>
          <InfoOutlinedIcon style={{ cursor: 'pointer' }} />
        </span>
      </Tooltip>
    </div>
  </div>
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

export const Default = Template.bind({});
Default.args = {};

export const Placement = TemplatePlacement.bind({});
Placement.args = {
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
