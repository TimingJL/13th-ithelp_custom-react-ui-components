import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { makeColor } from '../../utils/color';

const DISABLED_COLOR = '#BFBFBF';

const transitionStyle = css`
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const SwitchButton = styled.div`
  height: ${(props) => props.$thumbSize}px;
  width: ${(props) => props.$switchWidth}px;
  background: ${(props) => props.$switchColor};
  display: inline-flex;
  color: #FFF;
  border-radius: 50px;
  position: relative;
  border: 3px solid ${(props) => props.$switchColor};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  box-sizing: content-box;
`;

const Thumb = styled.div`
  width: ${(props) => props.$thumbSize}px;
  height: ${(props) => props.$thumbSize}px;
  border-radius: 50px;
  background: #FFF;
  position: absolute;
  ${(props) => {
    if (props.$isChecked) {
      return `left: ${props.$switchWidth - props.$thumbSize}px;`;
    }
    return 'left: 0px;';
  }}
  ${transitionStyle}
`;

const Label = styled.div`
  position: absolute;
  font-size: 14px;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => {
    if (props.$isChecked) {
      return `
      left: 0px;
      margin-left: ${props.$padding}px;
      `;
    }
    return `
    left: ${props.$distanceToThumb + props.$thumbSize - props.$padding}px;
    `;
  }}
  ${transitionStyle}
`;

/**
 * Switch 元件是一個開關的選擇器(另外常見的說法是 Toggle Switch / Switch Button)。
 * 在我們表示開關狀態，或兩種狀態之間的切換時，很適合使用。和 checkbox 的區別是， checkbox 一般只用來標記狀態是否被選取，
 * 需要提交之後才會生效，而 Switch 則會在觸發的當下直接觸發狀態的改變。
 */
const Switch = ({
  isChecked, isDisabled,
  size, themeColor, onChange,
  checkedChildren, unCheckedChildren,
  ...props
}) => {
  const labelRef = useRef(null);
  const [switchWidth, setSwitchWidth] = useState(size === 'small' ? 28 : 42);
  const [checked, setChecked] = useState(isChecked || false);
  const thumbSize = size === 'small' ? 12 : 18;
  const distanceToThumb = 8;
  const padding = 4;
  const switchColor = checked ? makeColor(themeColor) : DISABLED_COLOR;

  const handleClickSwitch = () => {
    setChecked((prev) => {
      const nextState = !prev;
      if (typeof onChange === 'function') {
        onChange(nextState);
      }
      return nextState;
    });
  };

  useEffect(() => {
    const labelWidth = labelRef?.current?.clientWidth;
    if (labelWidth) {
      setSwitchWidth(labelWidth + thumbSize + distanceToThumb);
    }
  }, [labelRef?.current?.clientWidth]);

  useEffect(() => {
    setChecked(() => {
      if (typeof onChange === 'function') {
        onChange(isChecked);
      }
      return isChecked;
    });
  }, [isChecked]);

  return (
    <SwitchButton
      $switchWidth={switchWidth}
      $thumbSize={thumbSize}
      $switchColor={switchColor}
      $isDisabled={isDisabled}
      onClick={isDisabled ? null : handleClickSwitch}
      {...props}
    >
      <Thumb
        $isChecked={checked}
        $thumbSize={thumbSize}
        $switchWidth={switchWidth}
      />
      <Label
        ref={labelRef}
        $distanceToThumb={distanceToThumb}
        $thumbSize={thumbSize}
        $padding={padding}
        $isChecked={checked}
      >
        {
          checked
            ? checkedChildren
            : unCheckedChildren
        }
      </Label>
    </SwitchButton>
  );
};

Switch.propTypes = {
  /**
   * 開啟狀態的內容。若設置，則由外部參數控制；若不設置，則由內部 state 控制
   */
  isChecked: PropTypes.bool,
  /**
   * 禁用狀態
   */
  isDisabled: PropTypes.bool,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 狀態改變的 callback function
   */
  onChange: PropTypes.func,
  /**
   * 開關大小
   */
  size: PropTypes.oneOf(['default', 'small']),
  /**
   * 開啟狀態的內容
   */
  checkedChildren: PropTypes.string,
  /**
   * 關閉狀態的內容
   */
  unCheckedChildren: PropTypes.string,
};

Switch.defaultProps = {
  isChecked: null,
  isDisabled: false,
  themeColor: 'primary',
  size: 'default',
  checkedChildren: '',
  unCheckedChildren: '',
  onChange: () => {},
};

export default Switch;
