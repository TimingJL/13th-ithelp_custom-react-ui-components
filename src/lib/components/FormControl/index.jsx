import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const topCommonStyle = css`
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`;

const bottomCommonStyle = css`
  flex-direction: column-reverse;
  & > *:not(:first-child) {
    margin-bottom: 8px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  margin-top: 4px !important;
  color: ${(props) => props.theme.color.error};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MaxLength = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.color.primary};
  display: flex;
  align-items: flex-end;
`;

const RequiredSign = styled.span`
  color: ${(props) => props.theme.color.error};
`;

const topLeftStyle = css`
  ${topCommonStyle}
`;
const topStyle = css`
  align-items: center;
  ${topCommonStyle}
`;
const topRightStyle = css`
  align-items: flex-end;
  ${topCommonStyle}
`;
const bottomLeftStyle = css`
  ${bottomCommonStyle}
`;
const bottomStyle = css`
  align-items: center;
  ${bottomCommonStyle}
`;
const bottomRightStyle = css`
  align-items: flex-end;
  ${bottomCommonStyle}
`;

const leftStyle = css`
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const rightStyle = css`
  align-items: center;
  flex-direction: row-reverse;
  & > *:not(:first-child) {
    margin-right: 8px;
  }
`;

const placementStyleMap = {
  'top-left': topLeftStyle,
  top: topStyle,
  'top-right': topRightStyle,
  left: leftStyle,
  right: rightStyle,
  'bottom-left': bottomLeftStyle,
  bottom: bottomStyle,
  'bottom-right': bottomRightStyle,
};

const StyledFormControl = styled.div`
  display: inline-flex;
  ${(props) => {
    if (props.$placement) {
      return placementStyleMap[props.$placement];
    }
    return null;
  }}
`;

/**
 * `FormControl` 讓我們可以將 form input 所需要的共同前後文特性獨立出來管理，
 * 使被 control 的子元件之間的樣式能夠保持一致性。
 * 例如在 form input 元件 `TextField`, `Switch`, `Checkbox` 當中，
 * 將 `label`, `required`, `error` ...等邏輯與樣式獨立出來藉由 FormControl 來管理。
 */
const FormControl = ({
  label,
  children,
  maxLength,
  placement,
  isError,
  errorMessage,
  isRequired,
  onChange,
  className,
  ...props
}) => {
  const [childrenValue, setChildrenValue] = useState('');
  const isSwitchComponent = children.type.name === 'Switch';

  const handleOnChange = (event) => {
    const targetValue = event?.target?.value;
    if (maxLength && targetValue.length > maxLength) return;

    setChildrenValue(targetValue);
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <StyledFormControl className={className} $placement={placement} {...props}>
      <LabelWrapper className="form-control__label-wrapper">
        <div className="form-control__label">
          {label}
          {isRequired && <RequiredSign>*</RequiredSign>}
        </div>
        {maxLength && <MaxLength>{`${childrenValue?.length} / ${maxLength}`}</MaxLength>}
      </LabelWrapper>
      {
        isSwitchComponent ? children : (
          React.cloneElement(children, {
            isError,
            value: childrenValue,
            onChange: handleOnChange,
          })
        )
      }
      {(isError && errorMessage) && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledFormControl>
  );
};

FormControl.propTypes = {
  /**
   * 客製化 class 樣式
   */
  className: PropTypes.string,
  /**
   * 標示為必填
   */
  isRequired: PropTypes.bool,
  /**
   * 顯示錯誤樣式
   */
  isError: PropTypes.bool,
  /**
   * 顯示錯誤訊息
   */
  errorMessage: PropTypes.string,
  /**
   * 限制最大輸入長度
   */
  maxLength: PropTypes.number,
  /**
   * 標題位置
   */
  placement: PropTypes.oneOf(['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']),
  /**
   * 標題內容
   */
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   *  狀態改變的 callback function
   */
  onChange: PropTypes.func,
  /**
   * 要管理的 form 內容
   */
  children: PropTypes.element,
};

FormControl.defaultProps = {
  className: '',
  isRequired: false,
  isError: false,
  errorMessage: null,
  placement: 'top-left',
  maxLength: null,
  label: '',
  onChange: () => {},
  children: null,
};

export default FormControl;
