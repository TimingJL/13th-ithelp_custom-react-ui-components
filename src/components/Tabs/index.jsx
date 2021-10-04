/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Tabs` 是一個選項卡切換元件，能夠在同一層級的內容組別當中導航、切換。
 * 此元件由兩個部分構成，一個是讓使用者點擊的導覽頁籤 Tab，一個是對應的內容 TabPanel。
 * 通常使用於同一層級的內容之間互相切換、導航。
*/
const Tabs = ({
  value, options, onChange,
}) => (
  <div>Tabs</div>
);

Tabs.propTypes = {
  /**
   * Tabs 選項內容
   */
  options: PropTypes.array,
  /**
   * 用來指定當前被選中的 Tab 項目
   */
  value: PropTypes.string,
  /**
   * 當 Tab 選項被選中時會被調用
   */
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  options: [],
  value: '',
  onChange: () => {},
};

export default Tabs;
