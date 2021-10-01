import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Dropdown` 是一個下拉選單元件，當頁面上的選項過多時，
 * 可以用這個元件來收納選項，透過滑鼠事件來觸發選單彈出，
 * 點擊選項會執行相對應的命令。
*/
const Dropdown = ({ children }) => (
  <div>
    {children}
  </div>
);

Dropdown.propTypes = {
  /**
   * 觸發元件
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Dropdown.defaultProps = {};

export default Dropdown;
