import React from 'react';
import PropTypes from 'prop-types';

/**
 * `Upload` 是一個上傳元件。幫助我們能夠發佈文字、圖片、影片、檔案到後端伺服器上。
*/
const Upload = ({
  children,
}) => (
  <div>{children}</div>
);

Upload.propTypes = {
  /**
   * 內容
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Upload.defaultProps = {

};

export default Upload;
