import React, { useState } from 'react';

import Accordion from '../components/Accordion';

export default {
  title: '數據展示元件/Accordion',
  component: Accordion,
};

const Template = (args) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <Accordion
      {...args}
      header="header"
      isExpand={isExpand}
      onClick={() => setIsExpand((prev) => !prev)}
    >
      Panel
    </Accordion>
  );
};

export const Default = Template.bind({});
Default.args = {};
