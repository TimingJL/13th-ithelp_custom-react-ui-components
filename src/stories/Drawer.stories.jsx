import React, { useState } from 'react';

import Button from '../components/Button';
import Drawer from '../components/Drawer';

export default {
  title: '導航元件/Drawer',
  component: Drawer,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
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

export const Default = Template.bind({});
