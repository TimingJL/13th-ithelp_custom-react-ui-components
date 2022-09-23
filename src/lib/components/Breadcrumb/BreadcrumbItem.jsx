import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.$isClickable && 'cursor: pointer;'}
  & > *:not(:first-child) {
    margin-left: 4px;
  }
`;

const BreadcrumbItem = ({ label, icon, to }) => {
  /**
   * Note: 使用 react-router-dom 來轉換 route path，此 demo 僅以 console.log 展示代替
  */
  // eslint-disable-next-line no-console
  const navigate = console.log;

  const handleClickPath = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <StyledItem
      role="presentation"
      key={label}
      $isClickable={!!to}
      onClick={() => handleClickPath(to)}
    >
      {icon}
      <span>{label}</span>
    </StyledItem>
  );
};

BreadcrumbItem.propTypes = {
  to: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.element,
};

BreadcrumbItem.defaultProps = {
  to: '',
  label: '',
  icon: null,
};

export default BreadcrumbItem;
