/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import SuccessIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import WarnIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorIcon from '@material-ui/icons/HighlightOffOutlined';

const rootId = 'toast-root';

const iconMap = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warn: <WarnIcon />,
  error: <ErrorIcon />,
};

const topIn = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
`;

const topOut = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%);
    opacity: 0;
  }
`;

const topStyle = css`
  animation: ${(props) => (props.$isVisible ? topIn : topOut)} 200ms ease-in-out forwards;
`;

const ToastWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  min-width: 300px;
  min-height: 52px;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 4px;
  background: #FFF;
  & > *:first-child {
    margin-right: 12px;
  }
  ${topStyle}
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  color: ${(prop) => prop.$color};
`;

const getColor = (type) => {
  if (type === 'success') {
    return '#52c41a';
  }
  if (type === 'info') {
    return '#1890ff';
  }
  if (type === 'warn') {
    return '#faad14';
  }
  if (type === 'error') {
    return '#d9363e';
  }
  return '#1890ff';
};

/**
 * `Toast` 可以提供使用者操作的反饋訊息。包含一般資訊、操作成功、操作失敗、警告訊息等。
 * 預設為在頂部置中顯示並自動消失，是一種不打斷用戶操作的輕量級提示方式。
*/
const Toast = ({
  type,
  content,
  duration,
}) => {
  const toastRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const color = getColor(type);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
    setTimeout(() => {
      const currentDOM = toastRef.current;
      const parentDOM = currentDOM.parentElement;
      parentDOM.parentElement.removeChild(parentDOM);
    }, duration + 200);
  }, [duration]);

  return (
    <ToastWrapper
      ref={toastRef}
      $isVisible={isVisible}
    >
      <Icon $color={color}>{iconMap[type]}</Icon>
      {content}
    </ToastWrapper>
  );
};

const getContainer = () => {
  let toastRoot;
  let toastContainer;
  if (document.getElementById(rootId)) {
    toastRoot = document.getElementById(rootId);
  } else {
    const divDOM = document.createElement('div');
    divDOM.id = rootId;
    document.body.appendChild(divDOM);
    toastRoot = divDOM;
  }

  if (toastRoot.firstChild) {
    toastContainer = toastRoot.firstChild;
  } else {
    const divDOM = document.createElement('div');
    toastRoot.appendChild(divDOM);
    toastContainer = divDOM;
  }
  const divDOM = document.createElement('div');
  toastContainer.appendChild(divDOM);

  toastRoot.style = css`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
  `;

  toastContainer.style = css`
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return divDOM;
};

export const message = {
  success: (props) => {
    render(<Toast {...props} type="success" />, getContainer());
  },
  info: (props) => {
    render(<Toast {...props} type="info" />, getContainer());
  },
  warn: (props) => {
    render(<Toast {...props} type="warn" />, getContainer());
  },
  error: (props) => {
    render(<Toast {...props} type="error" />, getContainer());
  },
};

Toast.propTypes = {
  /**
   * 提示訊息種類
  */
  type: PropTypes.oneOf(['success', 'info', 'warn', 'error']),
  /**
   * 提示訊息內容
  */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /**
   * 提示訊息展示時間
  */
  duration: PropTypes.number,
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
};

export default Toast;
