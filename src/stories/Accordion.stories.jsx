/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';

import Accordion from '../components/Accordion';

export default {
  title: '數據展示元件/Accordion',
  component: Accordion,
};

const AccordionGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #587cb0;
  border-bottom: 1px solid #587cb0;
  & > *:not(:first-child) {
    margin-top: 1px;
  }
`;

const StyledAccordion = styled(Accordion)`
  border: none;
  .accordion__header {
    background: #587cb028;
    padding: 16px;
  }
`;

const Panel = styled.div`
  padding: 16px;
`;

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

const TemplateAccordionGroup = (args) => {
  const [activeKey, setActiveKey] = useState(false);

  return (
    <AccordionGroup>
      {
        [...Array(4).keys()].map((key) => (
          <StyledAccordion
            key={key}
            {...args}
            header={`header__${key + 1}`}
            isExpand={activeKey === key}
            onClick={() => {
              if (activeKey === key) {
                setActiveKey('');
              } else {
                setActiveKey(key);
              }
            }}
          >
            <Panel>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Panel>
          </StyledAccordion>
        ))
      }
    </AccordionGroup>
  );
};

export const Default = Template.bind({});

export const ShowSingleAccordion = TemplateAccordionGroup.bind({});
