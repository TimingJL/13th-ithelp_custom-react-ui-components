import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useColor } from '../../hooks/useColor';

const topLeftStyle = css`
  top: 0px;
  left: 0px;
  transform: translate(-50%, -50%);
`;

const topRightStyle = css`
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
`;

const bottomLeftStyle = css`
  bottom: 0px;
  left: 0px;
  transform: translate(-50%, 50%);
`;

const bottomRightStyle = css`
  bottom: 0px;
  right: 0px;
  transform: translate(50%, 50%);
`;

const placementStyleMap = {
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
};

const BadgeWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;

const StandardBadge = styled.div`
  display: flex;
  flex-flow: row wrap;
  place-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 12px;
  min-width: 20px;
  padding: 0px 6px;
  height: 20px;
  border-radius: 10px;
  z-index: 1;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${(props) => props.$color};
  color: #FFF;
  ${(props) => placementStyleMap[props.$placement] || topRightStyle}
`;

const DotBadge = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${(props) => props.$color};
  ${(props) => placementStyleMap[props.$placement] || topRightStyle}
`;

const makeBadgeContent = ({ showZero, max, badgeContent }) => {
  if (showZero && badgeContent === 0) {
    return '0';
  }
  if (!showZero && badgeContent === 0) {
    return null;
  }
  return badgeContent > max ? `${max}+` : badgeContent;
};

/**
 * `Badge` 可以讓我們在其 children element 的右上角(預設位置)顯示一個小徽章，
 * 通常用來表示需要處理的訊息數量，透過醒目的視覺形式來吸引用戶處理。
*/
const Badge = ({
  children,
  themeColor,
  badgeContent,
  placement,
  max,
  variant,
  className,
  showZero,
}) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const content = makeBadgeContent({ showZero, max, badgeContent });

  return (
    <BadgeWrapper>
      {children}
      {variant === 'dot' && (
      <DotBadge
        className={className}
        $color={color}
        $placement={placement}
      />
      )}
      {variant === 'standard' && content && (
      <StandardBadge
        className={className}
        $color={color}
        $placement={placement}
      >
        {content}
      </StandardBadge>
      )}
    </BadgeWrapper>
  );
};

Badge.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 展示內容
   */
  badgeContent: PropTypes.number,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 徽章位置
   */
  placement: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  /**
   * 最大顯示值
   */
  max: PropTypes.number,
  /**
   * 變化模式
   */
  variant: PropTypes.oneOf(['standard', 'dot']),
  /**
   * 是否呈現 0
   */
  showZero: PropTypes.bool,
  /**
   * 內容
   */
  children: PropTypes.element.isRequired,
};

Badge.defaultProps = {
  className: '',
  badgeContent: null,
  themeColor: '#F85149',
  placement: 'top-right',
  variant: 'standard',
  max: 99,
  showZero: false,
};

export default Badge;
