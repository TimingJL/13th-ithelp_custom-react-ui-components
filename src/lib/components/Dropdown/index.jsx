/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import { findAttributeInEvent } from '../../utils/event';

const topStyle = css`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    calc(-100% - ${(props) => props.$gap}px)
  );
`;

const topLeftStyle = css`
  transform: translate(
    0px,
    calc(-100% - ${(props) => props.$gap}px)
  );
`;

const topRightStyle = css`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    calc(-100% - ${(props) => props.$gap}px)
  );
`;

const bottomStyle = css`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`;

const bottomLeftStyle = css`
  transform: translate(
    0px,
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`;

const bottomRightStyle = css`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`;

const rightTopStyle = css`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    0px
  );
`;

const rightBottomStyle = css`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`;

const leftBottomStyle = css`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`;

const leftTopStyle = css`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    0px
  );
`;

const leftStyle = css`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
`;

const rightStyle = css`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
`;

const placementStyleMap = {
  top: topStyle,
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
  bottom: bottomStyle,
  'right-top': rightTopStyle,
  'left-top': leftTopStyle,
  'right-bottom': rightBottomStyle,
  'left-bottom': leftBottomStyle,
  left: leftStyle,
  right: rightStyle,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const OverlayWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  animation: ${(props) => (props.$isOpen ? fadeIn : fadeOut)} .3s ease-in-out forwards;
  ${(props) => placementStyleMap[props.$placement] || placementStyleMap.top}
`;

/**
 * `Dropdown` 是一個下拉選單元件，當頁面上的選項過多時，
 * 可以用這個元件來收納選項，透過滑鼠事件來觸發選單彈出，
 * 點擊選項會執行相對應的命令。
*/
const Dropdown = ({
  children, placement, overlay, isOpen,
  onClick, onClose,
}) => {
  const childrenRef = useRef();
  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleOnResize = () => {
    setChildrenSize({
      width: childrenRef.current.offsetWidth,
      height: childrenRef.current.offsetHeight,
    });
    setPosition({
      top: childrenRef.current.getBoundingClientRect().top,
      left: childrenRef.current.getBoundingClientRect().left,
    });
  };

  const handleOnClick = useCallback((event) => {
    const dropdownId = findAttributeInEvent(event, 'data-dropdown-id');
    if (!dropdownId) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  }, [handleOnClick]);

  useEffect(() => {
    handleOnResize();
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  return (
    <>
      <span
        role="presentation"
        ref={childrenRef}
        data-dropdown-id="dropdown"
        onClick={onClick}
      >
        {children}
      </span>
      <Portal>
        <OverlayWrapper
          data-dropdown-id="dropdown"
          $isOpen={isOpen}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
        >
          {overlay}
        </OverlayWrapper>
      </Portal>
    </>
  );
};

Dropdown.propTypes = {
  /**
   * 出現位置
   */
  placement: PropTypes.oneOf([
    'top', 'top-left', 'top-right',
    'bottom', 'bottom-left', 'bottom-right',
    'left-top', 'left', 'left-bottom',
    'right-top', 'right', 'right-bottom',
  ]),
  /**
   * 是否顯示菜單
   */
  isOpen: PropTypes.bool,
  /**
   * 點擊事件
   */
  onClick: PropTypes.func,
  /**
   * 關閉菜單事件
   */
  onClose: PropTypes.func,
  /**
   * 菜單內容
   */
  overlay: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /**
   * 觸發元件
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Dropdown.defaultProps = {
  placement: 'bottom',
  isOpen: false,
  onClick: () => {},
  onClose: () => {},
};

export default Dropdown;
