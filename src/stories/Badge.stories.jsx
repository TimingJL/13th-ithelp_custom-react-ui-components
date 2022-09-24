import React, { useState } from 'react';
import styled from 'styled-components';

import MailIcon from '@material-ui/icons/Mail';
import Badge from '../components/Badge';
import TextField from '../components/TextField';
import Switch from '../components/Switch';

export default {
  title: '數據展示元件/Badge',
  component: Badge,
};

const BadgePlacementWrapper = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 20px;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VariantGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template = (args) => <Badge {...args} />;

const TemplatePlacement = (args) => (
  <BadgePlacementWrapper>
    <Badge {...args} />
    <Badge {...args} placement="top-left" />
    <Badge {...args} placement="bottom-right" />
    <Badge {...args} placement="bottom-left" />
  </BadgePlacementWrapper>
);

const TemplateMax = (args) => {
  const [badgeContent, setBadgeContent] = useState(120);

  const handleOnChange = (event) => {
    const { value } = event.target;
    const num = Number(value);
    if (Number.isInteger(num) && num > -1) {
      setBadgeContent(Number(value));
    }
  };

  return (
    <SpaceBetween>
      <Badge {...args} badgeContent={badgeContent} />
      <TextField value={badgeContent} onChange={handleOnChange} />
    </SpaceBetween>
  );
};

const TemplateCustomColor = (args) => {
  const [pickedColor, setPickedColor] = useState('#FE6B8B');

  return (
    <SpaceBetween>
      <VariantGroup>
        <Badge {...args} themeColor={pickedColor} />
        <Badge {...args} themeColor={pickedColor} variant="dot" />
      </VariantGroup>
      <input
        type="color"
        value={pickedColor}
        onChange={(event) => setPickedColor(event.target.value)}
      />
    </SpaceBetween>
  );
};

const TemplateShowZero = (args) => {
  const [showZero, setShowZero] = useState(true);

  return (
    <SpaceBetween>
      <VariantGroup>
        <Badge {...args} showZero={showZero} />
      </VariantGroup>
      <Switch
        isChecked={showZero}
        onChange={() => setShowZero((prev) => !prev)}
      />
    </SpaceBetween>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <MailIcon />,
  badgeContent: 7,
};

export const Placement = TemplatePlacement.bind({});
Placement.args = {
  children: <MailIcon />,
  badgeContent: 7,
};

export const WithMax = TemplateMax.bind({});
WithMax.args = {
  max: 87,
  children: <MailIcon />,
};

export const VariantDot = TemplatePlacement.bind({});
VariantDot.args = {
  children: <MailIcon />,
  badgeContent: 7,
  variant: 'dot',
};

export const CustomColor = TemplateCustomColor.bind({});
CustomColor.args = {
  children: <MailIcon />,
  badgeContent: 7,
};

export const ShowZero = TemplateShowZero.bind({});
ShowZero.args = {
  children: <MailIcon />,
  badgeContent: 0,
};
