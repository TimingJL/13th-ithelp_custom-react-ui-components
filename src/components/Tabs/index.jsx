/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { useColor } from 'hooks/useColor';

import TabGroup from './TabGroup';
import Tab from './Tab';

/**
 * `Tabs` 是一個選項卡切換元件，能夠在同一層級的內容組別當中導航、切換。
 * 此元件由兩個部分構成，一個是讓使用者點擊的導覽頁籤 Tab，一個是對應的內容 TabPanel。
 * 通常使用於同一層級的內容之間互相切換、導航。
*/
const Tabs = ({
  className,
  themeColor,
  value, options, onChange,
}) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  return (
    <TabGroup
      className={className}
      onChange={onChange}
      value={value}
      color={color}
    >
      {
        options.map((option) => (
          <Tab
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))
      }
    </TabGroup>
  );
};

Tabs.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
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
  className: '',
  themeColor: 'primary',
  options: [],
  value: '',
  onChange: () => {},
};

export default Tabs;
