import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Chip` 元件用於標記事物的屬性、標籤或用於分類、篩選。
 */
const Chip = ({ children }) => (
  <div>
    {children}
  </div>
);

Chip.propTypes = {
  /**
   * 內容
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Chip.defaultProps = {};

export default Chip;
