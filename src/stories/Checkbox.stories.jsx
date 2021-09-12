import React, { useState } from 'react';
import styled from 'styled-components';

import Checkbox from '../components/Checkbox';

export default {
  title: '數據輸入元件/Checkbox',
  component: Checkbox,
};

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TemplateWithState = (args) => {
  const { isChecked: defaultChecked } = args;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleOnClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <RadioWrapper>
      <Checkbox
        {...args}
        isChecked={isChecked}
        onClick={handleOnClick}
      />
    </RadioWrapper>
  );
};

export const Default = TemplateWithState.bind({});
Default.args = {
  children: 'Checkbox',
};
