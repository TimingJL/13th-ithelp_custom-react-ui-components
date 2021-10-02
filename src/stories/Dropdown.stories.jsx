import React, { useState } from 'react';
import styled from 'styled-components';

import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default {
  title: '導航元件/Dropdown',
  component: Dropdown,
};

const DropdownGroup = styled.div`
  & > * {
    margin: 20px;
  }
`;

const Template = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      overlay={(
        <div>menu</div>
      )}
    >
      <Button
        style={{ borderRadius: 4 }}
        variant="outlined"
      >
        Dropdown
      </Button>
    </Dropdown>
  );
};

const TemplatePlacement = () => {
  const [isOpenBottomLeft, setIsOpenBottomLeft] = useState(false);
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [isOpenTopLeft, setIsOpenLeft] = useState(false);

  return (
    <DropdownGroup>
      <Dropdown
        isOpen={isOpenBottomLeft}
        onClick={() => setIsOpenBottomLeft(true)}
        onClose={() => setIsOpenBottomLeft(false)}
        placement="bottom-left"
        overlay={(
          <div>menu</div>
        )}
      >
        <Button
          style={{ borderRadius: 4 }}
          variant="outlined"
        >
          bottom-left
        </Button>
      </Dropdown>
      <Dropdown
        isOpen={isOpenTop}
        onClick={() => setIsOpenTop(true)}
        onClose={() => setIsOpenTop(false)}
        placement="top"
        overlay={(
          <div>menu</div>
        )}
      >
        <Button
          style={{ borderRadius: 4 }}
          variant="outlined"
        >
          top
        </Button>
      </Dropdown>
      <Dropdown
        isOpen={isOpenTopLeft}
        onClick={() => setIsOpenLeft(true)}
        onClose={() => setIsOpenLeft(false)}
        placement="top-left"
        overlay={(
          <div>menu</div>
        )}
      >
        <Button
          style={{ borderRadius: 4 }}
          variant="outlined"
        >
          top-left
        </Button>
      </Dropdown>
    </DropdownGroup>
  );
};

export const Default = Template.bind({});

export const WithPlacement = TemplatePlacement.bind({});
