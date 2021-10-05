/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const activeStyle = css`
  color: ${(props) => props.$color} !important;
`;

const StyledTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 120px;
  height: 48px;
  &:hover {
    background: #eeeeee55;
  }
  ${(props) => (props.$isActive ? activeStyle : null)}
`;

const Tab = ({
  label, value, isActive, onClick, color, ...props
}) => (
  <StyledTab
    value={value}
    $isActive={isActive}
    $color={color}
    onClick={onClick}
    className="tab__tab-button"
    {...props}
  >
    <span>{label}</span>
  </StyledTab>
);

Tab.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isActive: PropTypes.bool,
  value: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  label: '',
  value: '',
  color: '',
  isActive: false,
  onClick: () => {},
};

export default Tab;
