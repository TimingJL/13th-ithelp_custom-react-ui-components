import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
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

const leftShowDrawer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
`;

const leftHideDrawer = keyframes`
  0% {
    left: 0%;
  }
  100% {
    left: -100%;
  }
`;

const rightShowDrawer = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;

const rightHideDrawer = keyframes`
  0% {
    right: 0%;
  }
  100% {
    right: -100%;
  }
`;

const bottomShowDrawer = keyframes`
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0%;
  }
`;

const bottomHideDrawer = keyframes`
  0% {
    bottom: 0%;
  }
  100% {
    bottom: -100%;
  }
`;

const topShowDrawer = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0%;
  }
`;

const topHideDrawer = keyframes`
  0% {
    top: 0%;
  }
  100% {
    top: -100%;
  }
`;

const topStyle = css`
  top: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? topShowDrawer : topHideDrawer)} ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const bottomStyle = css`
  bottom: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? bottomShowDrawer : bottomHideDrawer)} ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const leftStyle = css`
  top: 0px;
  left: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? leftShowDrawer : leftHideDrawer)} ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const rightStyle = css`
  top: 0px;
  right: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? rightShowDrawer : rightHideDrawer)} ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const placementMap = {
  top: topStyle,
  right: rightStyle,
  bottom: bottomStyle,
  left: leftStyle,
};

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

const DrawerWrapper = styled.div`
  position: fixed;
  z-index: 3;
  background: #FFF;
  ${(props) => placementMap[props.$placement] || placementMap.left}
`;

/**
 * `Drawer` 抽屜元件，由螢幕邊緣滑出的浮動面版，
 * 常見的應用是作為導航用途，例如 Navigation drawers。
 */
const Drawer = ({
  children, isOpen, placement, onClose,
  animationDuration,
}) => {
  const [isDisplay, setIsDisplay] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsDisplay(true);
    } else {
      setTimeout(() => {
        setIsDisplay(false);
      }, (animationDuration + 100));
    }
  }, [animationDuration, isOpen]);

  return isDisplay && (
    <Portal>
      <Mask
        $isOpen={isOpen}
        $animationDuration={animationDuration}
        onClick={onClose}
      />
      <DrawerWrapper
        $isOpen={isOpen}
        $placement={placement}
        $animationDuration={animationDuration}
      >
        {children}
      </DrawerWrapper>
    </Portal>
  );
};

Drawer.propTypes = {
  /**
   * 抽屜的方向
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * 抽屜是否顯示
   */
  isOpen: PropTypes.bool,
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

Drawer.defaultProps = {
  isOpen: false,
  placement: 'left',
  animationDuration: 200,
  onClose: () => {},
};

export default Drawer;
