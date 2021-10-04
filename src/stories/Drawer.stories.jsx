import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Drawer from '../components/Drawer';

export default {
  title: '導航元件/Drawer',
  component: Drawer,
};

const ButtonGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div style={{ width: 300 }}>Drawer content</div>
      </Drawer>
    </>
  );
};

const TemplatePlacement = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('');
  const [drawerStyle, setDrawerStyle] = useState({});

  const handleOpenDrawer = ({ clickedPlacement }) => {
    setIsOpen(true);
    setPlacement(clickedPlacement);
    if (['left', 'right'].indexOf(clickedPlacement) > -1) {
      setDrawerStyle({
        width: 300,
      });
    }
    if (['top', 'bottom'].indexOf(clickedPlacement) > -1) {
      setDrawerStyle({
        height: 300,
      });
    }
  };

  return (
    <>
      <ButtonGroup>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'top' })}>Top</Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'right' })}>Right</Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'bottom' })}>Bottom</Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'left' })}>Left</Button>
      </ButtonGroup>
      <Drawer
        {...args}
        isOpen={isOpen}
        placement={placement}
        onClose={() => setIsOpen(false)}
      >
        <div style={drawerStyle}>{`${placement} drawer`}</div>
      </Drawer>
    </>
  );
};

export const Default = Template.bind({});

export const Placement = TemplatePlacement.bind({});
