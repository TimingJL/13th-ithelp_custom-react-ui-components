import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import Portal from 'components/Portal';

const hideMask = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const showMask = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Mask = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 2;
  animation: ${(props) => (props.$isOpen ? showMask : hideMask)} ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 3;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

/**
 * `Modal` 元件為彈出相關元件提供了重要的基礎建設，
 * 例如 `對話框(Dialog)`、`彈出提示框(Popovers)`、`菜單(Menu)`、`抽屜(Drawer)`...等等元件。
 * 其使用時機是當系統流程當中需要用戶處理額外事務，但又不希望跳轉頁面以打斷目前工作流程時，提供一個彈出互動框解決方案。
*/
const Modal = ({
  isOpen,
  onClose,
  animationDuration,
  children,
  hasMask,
}) => {
  const [removeDOM, setRemoveDOM] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setRemoveDOM(false);
    } else {
      setTimeout(() => {
        setRemoveDOM(true);
      }, (animationDuration + 100));
    }
  }, [animationDuration, isOpen]);

  return !removeDOM && (
    <Portal>
      {hasMask && (
        <Mask
          $isOpen={isOpen}
          $animationDuration={animationDuration}
          onClick={onClose}
        />
      )}
      <ModalWrapper
        $isOpen={isOpen}
      >
        {children}
      </ModalWrapper>
    </Portal>
  );
};

Modal.propTypes = {
  /**
   * 抽屜是否顯示
   */
  isOpen: PropTypes.bool,
  /**
   * 是否顯示遮罩
   */
  hasMask: PropTypes.bool,
  /**
  * 觸發抽屜關閉
  */
  onClose: PropTypes.func,
  /**
  * 定義動畫完成一次週期的時間(ms)
  */
  animationDuration: PropTypes.number,
  /**
  * 內容
  */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  hasMask: true,
  animationDuration: 200,
  onClose: () => {},
};

export default Modal;
