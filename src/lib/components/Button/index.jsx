import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useColor } from '../../hooks/useColor';

const containedStyle = css`
  background: ${(props) => props.$btnColor};
  color: #FFF;
`;

const outlinedStyle = css`
  background: #FFF;
  color: ${(props) => props.$btnColor};
  border: 1px solid ${(props) => props.$btnColor};
  &:hover {
    background: ${(props) => `${props.$btnColor}10`};
  }
`;

const textStyle = css`
  background: #FFF;
  color: ${(props) => props.$btnColor};
  &:hover {
    background: ${(props) => `${props.$btnColor}10`};
  }
`;

const disabledStyle = css`
  cursor: not-allowed;
  &:hover, &:active {
    opacity: 1;
  }
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
  text: textStyle,
};

const StyledCircularProgress = styled(CircularProgress)`
  margin-right: 8px;
  color: ${(props) => (props.$variant === 'contained' ? '#FFF' : props.$color)} !important;
`;

const StartIcon = styled.span`
  margin-right: 8px;
`;

const EndIcon = styled.span`
  margin-left: 8px;
`;

const StyledButton = styled.button`
  border: none;
  outline: none;
  min-width: 100px;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border 0.2s, opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }

  ${(props) => variantMap[props.$variant] || variantMap.primary}
  &:disabled {
    ${disabledStyle}
  }
`;

/**
 * `Button` 元件代表一個可點擊的按鈕，在使用者點擊之後會觸發相對應的業務邏輯。
 */
const Button = ({
  className,
  children,
  themeColor,
  variant,
  isLoading,
  isDisabled,
  startIcon,
  endIcon,
  onClick,
  ...props
}) => {
  const { makeColor } = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledButton
      type="button"
      className={className}
      $btnColor={btnColor}
      $variant={variant}
      disabled={isDisabled}
      onClick={isDisabled ? null : onClick}
      {...props}
    >
      <>
        {isLoading && (
        <StyledCircularProgress
          $variant={variant}
          $color={btnColor}
          size={16}
        />
        )}
        {startIcon && <StartIcon>{startIcon}</StartIcon>}
        <span>{children}</span>
        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </>
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * 設置按鈕類型
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 內容
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 載入中狀態
   */
  isLoading: PropTypes.bool,
  /**
   * 禁用狀態
   */
  isDisabled: PropTypes.bool,
  /**
   * 設置按鈕左方圖示
   */
  startIcon: PropTypes.element,
  /**
   * 設置按鈕右方圖示
   */
  endIcon: PropTypes.element,
  /**
   * 點擊事件
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: 'contained',
  className: null,
  themeColor: 'primary',
  isLoading: false,
  isDisabled: false,
  startIcon: null,
  endIcon: null,
  onClick: () => {},
};

export default Button;
