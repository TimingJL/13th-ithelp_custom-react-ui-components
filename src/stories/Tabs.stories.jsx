import React, { useState } from 'react';
import styled from 'styled-components';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import Tabs from '../lib/components/Tabs';

export default {
  title: '導航元件 /Tabs',
  component: Tabs,
};

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #EEE;
`;

const StyledCentered = styled(Tabs)`
  border-bottom: 1px solid #EEE;
  .tab__tab-group {
    justify-content: center;
  }
`;

const StyledIconTabs = styled(Tabs)`
  border-bottom: 1px solid #EEE;
  .tab__tab-group {
    justify-content: center;
  }
  .tab__tab-button {
    color: #B9B9B9;
  }
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

const iconTabOptions = [
  {
    value: 'phone',
    label: <PhoneIcon />,
  },
  {
    value: 'favorite',
    label: <FavoriteIcon />,
  },
  {
    value: 'person',
    label: <PersonPinIcon />,
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

const TemplateCentered = (args) => {
  const [selectedValue, setSelectedValue] = useState(tabOptions[0].value);

  return (
    <>
      <StyledCentered
        options={tabOptions}
        {...args}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>
        {`TabPanel of #${selectedValue}`}
      </TabPanel>
    </>
  );
};

const TemplateIconTabs = () => {
  const [selectedValue, setSelectedValue] = useState(iconTabOptions[0].value);

  return (
    <>
      <StyledIconTabs
        options={iconTabOptions}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>
        {`TabPanel of #${selectedValue}`}
      </TabPanel>
    </>
  );
};

const TemplateColor = () => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);
  const [selectedValue, setSelectedValue] = useState(tabOptions[0].value);

  return (
    <>
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 20,
      }}
      >
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
          style={{ marginRight: 8 }}
        />
      </div>
      <StyledTabs
        options={tabOptions}
        value={selectedValue}
        themeColor={pickedColor}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>
        {`TabPanel of #${selectedValue}`}
      </TabPanel>
    </>
  );
};

export const Default = Template.bind({});

export const Centered = TemplateCentered.bind({});

export const IconTab = TemplateIconTabs.bind({});

export const ColoredTab = TemplateColor.bind({});
