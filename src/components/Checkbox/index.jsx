import React from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';

/**
 * Checkbox 是一個多選框元件。通常使用情境是在一個群組的選項當中進行多項選擇時使用。
 */
const Checkbox = (props) => <Option {...props} />;

Checkbox.propTypes = {
  /**
   * 開啟或關閉
   */
  isChecked: PropTypes.bool,
  /**
   * 是否禁用
   */
  isDisabled: PropTypes.bool,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 點擊事件
   */
  onClick: PropTypes.func,
  /**
   * 內容
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

Checkbox.defaultProps = {
  isChecked: false,
  isDisabled: false,
  themeColor: 'primary',
  onClick: () => {},
  children: '',
};

export default Checkbox;
