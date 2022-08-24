import React from 'react';
import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const StyledColorFlashBlock = styled.div`
  width: 12px;
  height: 12px;
  background: #EEE;
  animation: ${flash} 0.8s ease-in-out alternate-reverse infinite;
`;

const ColorFlashBlock = (props) => (
  <StyledColorFlashBlock {...props} />
);

export default ColorFlashBlock;
