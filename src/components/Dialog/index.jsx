import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Modal from '../Modal';
import Header from './Header';
import Footer from './Footer';

const hideDialog = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
`;

const showDialog = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const DialogWrapper = styled.div`
  width: calc(100vw - 40px);
  max-width: 520px;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  animation: ${(props) => (props.$isOpen ? showDialog : hideDialog)} 200ms ease-in-out forwards;
`;

const Content = styled.div`
  padding: 20px;
`;

const Dialog = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <DialogWrapper $isOpen={isOpen}>
      <Header title={title} onClose={onClose} />
      <Content>
        {children}
      </Content>
      <Footer onClose={onClose} onSubmit={onSubmit} />
    </DialogWrapper>
  </Modal>
);

Dialog.propTypes = {
  /**
   * 是否顯示
   */
  isOpen: PropTypes.bool,
  /**
   * 關閉事件
   */
  onClose: PropTypes.func,
  /**
  * 內容
  */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /**
  * 標題內容
  */
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * 確認事件
   */
  onSubmit: PropTypes.func,
};

Dialog.defaultProps = {
  isOpen: false,
  title: null,
  onClose: () => {},
  onSubmit: () => {},
};

export default Dialog;
