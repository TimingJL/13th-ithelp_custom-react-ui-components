import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../Button';

const FooterWrapper = styled.div`
  padding: 12px 20px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const Footer = ({ onClose, onSubmit }) => (
  <FooterWrapper>
    <ButtonGroup>
      <Button variant="outlined" onClick={onClose}>取消</Button>
      <Button onClick={onSubmit}>確認</Button>
    </ButtonGroup>
  </FooterWrapper>
);

Footer.propTypes = {
  /**
   * 關閉事件
   */
  onClose: PropTypes.func,
  /**
   * 送出事件
   */
  onSubmit: PropTypes.func,
};

Footer.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
};

export default Footer;
