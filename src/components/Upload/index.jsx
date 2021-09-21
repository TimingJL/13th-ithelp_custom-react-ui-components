import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * `Upload` 是一個上傳元件。幫助我們能夠發佈文字、圖片、影片、檔案到後端伺服器上。
*/
const Upload = ({
  resetKey,
  children,
  onChange,
  ...props
}) => {
  const inputFileRef = useRef();

  const handleOnClickUpload = () => {
    inputFileRef.current.click();
  };

  const handleOnChange = (event) => {
    if (typeof onChange === 'function') {
      onChange(event?.target?.files);
    }
  };

  useEffect(() => {
    if (resetKey) {
      inputFileRef.current.value = '';
      handleOnChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return (
    <>
      <input
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleOnChange}
        {...props}
      />
      {
        React.cloneElement(children, {
          onClick: handleOnClickUpload,
        })
      }
    </>
  );
};

Upload.propTypes = {
  /**
   * 重設鍵值
   */
  resetKey: PropTypes.number,
  /**
   * 限制檔案類型
   */
  accept: PropTypes.string,
  /**
   * 是否選取多個檔案
   */
  multiple: PropTypes.bool,
  /**
   * 選取上傳檔案時的 callback
   */
  onChange: PropTypes.func,
  /**
   * 內容，這邊指的是上傳按鈕外觀
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Upload.defaultProps = {
  resetKey: 0,
  accept: undefined,
  multiple: false,
  onChange: () => {},
};

export default Upload;
