import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Drawer` 抽屜元件，由螢幕邊緣滑出的浮動面版，
 * 常見的應用是作為導航用途，例如 Navigation drawers。
 */
const Drawer = ({ children }) => (
  <div>
    Drawer
  </div>
);

Drawer.propTypes = {
  /**
   * 內容
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Drawer.defaultProps = {};

export default Drawer;
