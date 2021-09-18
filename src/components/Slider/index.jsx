import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Slider` 是一個滑動型輸入器，允許使用者在數值區間內進行選擇，選擇的值可為連續值或是離散值。
 */
const Slider = ({
  onChange,
  ...props
}) => (
  <div>
    <input
      type="range"
      min="0"
      max="100"
      onChange={onChange}
      {...props}
    />
  </div>
);

Slider.propTypes = {
  /**
   * 數值改變的 callback function
   */
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  onChange: () => {},
};

export default Slider;
