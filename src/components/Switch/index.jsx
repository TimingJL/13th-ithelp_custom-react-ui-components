import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useColor } from 'hooks/useColor';

const transitionStyle = css`
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, right 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
  padding: 0px ${(props) => props.$padding}px;
  ${(props) => {
    if (props.$isChecked) {
      return `right: ${props.$switchWidth - props.$labelWidth}px;`;
    }
    return `
    right: 0px;
    `;
  }}
  ${transitionStyle}
`;

/**
 * `Switch` 元件是一個開關的選擇器。
 * 在我們表示開關狀態，或兩種狀態之間的切換時，很適合使用。和 Checkbox 的區別是， Checkbox 一般只用來標記狀態是否被選取，
 * 需要提交之後才會生效，而 Switch 則會在觸發的當下直接觸發狀態的改變。
 */
const Switch = ({
  isChecked, isDisabled,
  size, themeColor, onChange,
  checkedChildren, unCheckedChildren,
  ...props
}) => {
  const labelRef = useRef(null);
  const { makeColor } = useColor();
  const [labelWidth, setLabelWidth] = useState(0);
  const thumbSize = size === 'small' ? 12 : 18;
  const switchWidth = thumbSize + labelWidth;
  const switchColor = makeColor({ themeColor, isDisabled: !isChecked });

  useEffect(() => {
    const minLabelSize = thumbSize * 1.2;
    const currentLabelWidth = labelRef?.current?.clientWidth;
    if (currentLabelWidth) {
      setLabelWidth(currentLabelWidth < minLabelSize ? minLabelSize : currentLabelWidth);
    }
  }, [labelRef?.current?.clientWidth, thumbSize]);

  return (
    <SwitchButton
      $switchWidth={switchWidth}
      $thumbSize={thumbSize}
      $switchColor={switchColor}
      $isDisabled={isDisabled}
      onClick={isDisabled ? null : onChange}
      {...props}
    >
      <Thumb
        $isChecked={isChecked}
        $thumbSize={thumbSize}
        $switchWidth={switchWidth}
      />
      <Label
        ref={labelRef}
        $padding={thumbSize / 3}
        $labelWidth={labelWidth}
        $switchWidth={switchWidth}
        $isChecked={isChecked}
      >
        {
          isChecked
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
