import React from 'react';
import styled from 'styled-components';

const StyledColorBlock = styled.div`
  width: 12px;
  height: 12px;
  background: #EEE;
`;

const ColorBlock = (props) => (
  <StyledColorBlock {...props} />
);

export default ColorBlock;
