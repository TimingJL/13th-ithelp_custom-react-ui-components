import React, { useState } from 'react';
import styled from 'styled-components';

import Tabs from '../components/Tabs';

export default {
  title: '導航元件 /Tabs',
  component: Tabs,
};

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #EEE;
`;

const TabPanel = styled.div`
  padding: 20px 0px;
`;

const tabOptions = [
  {
    value: 'item-one',
    label: 'ITEM ONE',
  },
  {
    value: 'item-two',
    label: 'ITEM TWO',
  },
  {
    value: 'item-three',
    label: 'ITEM THREE',
  },
  {
    value: 'item-four',
    label: 'ITEM FOUR',
  },
];

const Template = () => {
  const [selectedValue, setSelectedValue] = useState(tabOptions[0].value);

  return (
    <>
      <StyledTabs
        value={selectedValue}
        options={tabOptions}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>
        {`TabPanel of #${selectedValue}`}
      </TabPanel>
    </>
  );
};

export const Default = Template.bind({});
