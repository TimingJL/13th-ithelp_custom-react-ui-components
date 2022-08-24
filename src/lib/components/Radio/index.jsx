import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import Option from '../Option';

/**
 * `Radio` 是一個單選框元件，讓我們在一組選項當中選擇其中一個選項。
 * 當我們的情境是希望用戶可以一次看到所有選項時，可以使用 Radio Button。
 * Radio Button 的選項不宜多，
 * `如果你的選項多到需要被折疊，那建議你使用更不佔空間的下拉選單元件`。
 */
const Radio = (props) => (
  <Option
    checkedIcon={<RadioButtonCheckedIcon />}
    unCheckedIcon={<RadioButtonUncheckedIcon />}
    {...props}
  />
);

Radio.propTypes = {
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
   * 在 RadioGroup 中用來幫助判斷是否被選中
   */
  value: PropTypes.string,
  /**
   * 內容
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

Radio.defaultProps = {
  isChecked: false,
  isDisabled: false,
  themeColor: 'primary',
  onClick: () => {},
  value: null,
  children: '',
};

export default Radio;
