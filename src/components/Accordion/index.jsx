import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './header';
import Panel from './panel';

const StyledAccordion = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid #DDD;
`;

/**
 * `Accordion` 是一個可折疊/展開內容區域的元件。
 * 主要是針對顯示內容複雜或很多的頁面進行分區塊的顯示及隱藏。
 */
const Accordion = ({
  header, children,
  isExpand, onClick, className,
}) => (
  <StyledAccordion className={className}>
    <Header isExpand={isExpand} onClick={onClick} header={header} />
    <Panel isExpand={isExpand} panel={children} />
  </StyledAccordion>
);

Accordion.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 是否展開
   */
  isExpand: PropTypes.bool,
  /**
   * 標題的點擊事件
   */
  onClick: PropTypes.func,
  /**
   * 標題內容
   */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /**
   * 可被收合的 panel 內容
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Accordion.defaultProps = {
  className: '',
  isExpand: false,
  onClick: () => {},
};

export default Accordion;
