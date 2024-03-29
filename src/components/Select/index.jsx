/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Dropdown from '../Dropdown';

const StyledCircularProgress = styled(CircularProgress)`
  margin-right: 8px;
  color: ${(props) => (props.$variant === 'contained' ? '#FFF' : props.$color)} !important;
`;

const selectBoxEnable = css`
  color: #333;
  &:hover {
    border: 1px solid #222;
  }
`;

const selectBoxDisable = css`
  background: #f5f5f5;
  color: #00000040;
`;

const SelectBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 180px;

  & > *:not(:first-child) {
    margin-left: 12px;
  }

  ${(props) => (props.$isDisabled ? selectBoxDisable : selectBoxEnable)}
`;

const ArrowDown = styled.div`
  height: 24px;
  width: 24px;
  transform: rotate(${(props) => (props.$isOpen ? 180 : 0)}deg);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Menu = styled.div`
  min-width: 180px;
  display: inline-flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#3091fd' : '#222')};

  &:hover {
    background: #e7f4f9;
  }
`;

/**
 * `Select` 是一個下拉選擇器。觸發時能夠彈出一個菜單讓用戶選擇操作。
*/
const Select = ({
  options, value, onSelect, placeholder,
  isDisabled, isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const foundOption = options.find((option) => option.value === value) || {};

  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => ((isDisabled || isLoading) ? null : setIsOpen(true))}
      onClose={() => setIsOpen(false)}
      placement="bottom-left"
      overlay={(
        <Menu>
          {
            options.map((option) => (
              <MenuItem
                key={option.value}
                role="presentation"
                $isSelected={option.value === value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </MenuItem>
            ))
          }
        </Menu>
      )}
    >
      <SelectBox $isDisabled={isDisabled || isLoading}>
        <span>{foundOption.label || placeholder}</span>
        {
          isLoading ? (
            <StyledCircularProgress
              $color="#00000040"
              size={16}
            />
          ) : (
            <ArrowDown $isOpen={isOpen}>
              <KeyboardArrowDown />
            </ArrowDown>
          )
        }
      </SelectBox>
    </Dropdown>
  );
};

Select.propTypes = {
  /**
   * 選項內容
   */
  options: PropTypes.array,
  /**
   * 用來指定當前被選中的項目
   */
  value: PropTypes.string,
  /**
   * 未選擇任何選項時顯示的 placeholder
   */
  placeholder: PropTypes.string,
  /**
   * 是否禁用下拉選單
   */
  isDisabled: PropTypes.bool,
  /**
   * 資料是否正在載入中
   */
  isLoading: PropTypes.bool,
  /**
   * 當選項被選中時會被調用
   */
  onSelect: PropTypes.func,
};

Select.defaultProps = {
  options: [],
  value: '',
  placeholder: '',
  isDisabled: false,
  isLoading: false,
  onSelect: () => {},

};

export default Select;
