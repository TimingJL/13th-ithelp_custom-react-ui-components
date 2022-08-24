import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

const StyledHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExpandIcon = styled.div`
	display: inline-flex;
	align-items: center;
	transform: rotate(${(props) => (props.$isExpand ? 180 : 0)}deg);
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Header = ({ header, isExpand, onClick }) => (
  <StyledHeader
    className="accordion__header"
    onClick={onClick}
  >
    {header}
    <ExpandIcon $isExpand={isExpand} className="accordion__header-expand-icon">
      <ArrowDownIcon style={{ fill: '#333333' }} />
    </ExpandIcon>
  </StyledHeader>
);

Header.propTypes = {
  isExpand: PropTypes.bool,
  onClick: PropTypes.func,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Header.defaultProps = {
  isExpand: false,
  onClick: () => {},
};

export default Header;
