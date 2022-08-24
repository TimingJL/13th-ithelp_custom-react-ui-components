import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.$isClickable && 'cursor: pointer;'}
  & > *:not(:first-child) {
    margin-left: 4px;
  }
`;

const BreadcrumbItem = ({ label, icon, to }) => {
  const history = useHistory();

  const handleClickPath = (path) => {
    if (path) {
      history.push(path);
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
