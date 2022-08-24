import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const errorStyle = css`
  border: 1px solid ${(props) => props.theme.color.error};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.error};
  }
`;

const disabledStyle = css`
  border: 1px solid ${(props) => props.theme.color.disable};
  cursor: not-allowed;
  background: ${(props) => props.theme.color.disable}22;
  .text-field__input {
    cursor: not-allowed;
    background: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.color.disable};
  }
`;

const StyledTextField = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #DDD;
  border-radius: 4px;
  padding: 8px 12px;
  box-sizing: border-box;
  height: 36px;

  &:hover {
    border: 1px solid #222;
  }

  ${(props) => (props.$isError ? errorStyle : null)}
  ${(props) => (props.$isDisabled ? disabledStyle : null)}
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 14px;
  color: #333;
  width: 100%;
`;

/**
 * `TextField` 是一個允許用戶輸入和編輯文字的元件。
 */
const TextField = ({
  className,
  prefix, suffix,
  isError,
  isDisabled,
  ...props
}) => (
  <StyledTextField
    className={className}
    $isError={isError}
    $isDisabled={isDisabled}
  >
    {prefix}
    <Input type="text" {...props} className="text-field__input" disabled={isDisabled} />
    {suffix}
  </StyledTextField>
);

TextField.propTypes = {
  /**
   * 客製化 class 樣式
   */
  className: PropTypes.string,
  /**
   * 前綴元件
   */
  prefix: PropTypes.element,
  /**
   * 後綴元件
   */
  suffix: PropTypes.element,
  /**
   * 佔位文字
   */
  placeholder: PropTypes.string,
  /**
   * 錯誤狀態
   */
  isError: PropTypes.bool,
  /**
   * 禁用狀態
   */
  isDisabled: PropTypes.bool,
  /**
   *  狀態改變的 callback function
   */
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  className: '',
  prefix: null,
  suffix: null,
  placeholder: '',
  isError: false,
  isDisabled: false,
  onChange: () => {},
};

export default TextField;
