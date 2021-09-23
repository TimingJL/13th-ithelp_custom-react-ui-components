import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Tooltip` 是一個文字彈出提醒元件，當 active 狀態時，會顯示對該子元件描述的文字。
 */
const Tooltip = ({ children }) => <div>{children}</div>;

Tooltip.propTypes = {
  /**
   * 內容
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Tooltip.defaultProps = {

};

export default Tooltip;
