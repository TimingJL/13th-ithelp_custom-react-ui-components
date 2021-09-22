import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useColor } from 'hooks/useColor';

const containedStyle = css`
  background: ${(props) => props.$color};
  color: #FFF;
`;

const outlinedStyle = css`
  background: #FFF;
  color: ${(props) => props.$color};
  &:hover {
    background: ${(props) => `${props.$color}10`};
  }
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
};

const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  padding: 0px 12px;
  height: 32px;
  border: 1px solid ${(props) => props.$color};
  ${(props) => variantMap[props.$variant] || variantMap.contained}
`;

/**
 * `Chip` 元件用於標記事物的屬性、標籤或用於分類、篩選。
 */
const Chip = ({
  className,
  variant,
  label,
  themeColor,
}) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  return (
    <StyledChip
      className={className}
      $variant={variant}
      $color={color}
    >
      {label}
    </StyledChip>
  );
};

Chip.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 設置變化模式
   */
  variant: PropTypes.oneOf(['contained', 'outlined']),
  /**
   * 內容
   */
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
};

Chip.defaultProps = {
  className: null,
  variant: 'contained',
  themeColor: 'primary',
};

export default Chip;
