import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #EEEEEE;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const Header = ({ title, onClose }) => (
  <HeaderWrapper>
    {title}
    <CloseButton onClick={onClose}>
      <CloseIcon />
    </CloseButton>
  </HeaderWrapper>
);

Header.propTypes = {
  /**
  * 標頭內容
  */
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * 關閉事件
   */
  onClose: PropTypes.func,
};

Header.defaultProps = {
  title: null,
  onClose: () => {},
};

export default Header;
