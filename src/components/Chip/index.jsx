import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import CancelIcon from '@material-ui/icons/Cancel';
import { useColor } from 'hooks/useColor';

const containedStyle = css`
  background: ${(props) => props.$color};
  color: #FFF;
`;

const outlinedStyle = css`
  background: #FFF;
  color: ${(props) => props.$color};
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
};

const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  height: 32px;
  border: 1px solid ${(props) => props.$color};
  ${(props) => variantMap[props.$variant] || variantMap.contained}

  .chip__start-icon {
    margin-left: 4px;
    margin-right: -6px;
  }

  .chip__end-icon {
    margin-right: 4px;
    margin-left: -6px;
    ${(props) => (props.$hasDelete ? 'cursor: pointer;' : null)}

    &:hover {
      ${(props) => (props.$hasDelete ? 'opacity: 0.8;' : null)}
    }
  }
`;

const Label = styled.span`
  padding: 0px 12px;
`;

/**
 * `Chip` 元件用於標記事物的屬性、標籤或用於分類、篩選。
 */
const Chip = ({
  className,
  variant,
  label,
  themeColor,
  icon,
  deleteIcon,
  onDelete,
}) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const endIcon = deleteIcon || <CancelIcon />;

  return (
    <StyledChip
      className={className}
      $variant={variant}
      $color={color}
      $hasDelete={!!onDelete}
    >
      {icon && React.cloneElement(icon, {
        className: 'chip__start-icon',
      })}
      <Label>{label}</Label>
      {(deleteIcon || onDelete) && React.cloneElement(endIcon, {
        className: 'chip__end-icon',
        onClick: onDelete,
      })}
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
  /**
   * 圖示
   */
  icon: PropTypes.element,
  /**
   * 刪除圖示
   */
  deleteIcon: PropTypes.element,
  /**
   * 刪除事件
   */
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

Chip.defaultProps = {
  className: null,
  variant: 'contained',
  themeColor: 'primary',
  icon: null,
  deleteIcon: null,
  onDelete: null,
};

export default Chip;
