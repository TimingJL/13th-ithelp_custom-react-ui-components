import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { makeColor } from '../../utils/color';

const DISABLED_COLOR = '#dadada';

const StyledRadio = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#222222')};

	& > *:not(:first-child) {
		margin-left: 8px;
	}

  .radio__checked-icon {
    color: ${(props) => props.$btnColor};
  }

  .radio__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#808080')};
  }

  &:hover {
    .radio__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$btnColor)};
    }
  }
`;

/**
 * `Radio` 是一個單選框元件。讓我們在一組選項當中選擇其中一個選項。
 * 當我們的情境是希望用戶可以一次看到所有選項時，可以使用 Radio Button。
 * Radio Button 的選項不宜多，
 * `如果你的選項多到需要被折疊，那建議你使用更不佔空間的下拉選單元件`。
 */
const Radio = ({
  isChecked,
  isDisabled,
  themeColor,
  onClick,
  children,
  ...props
}) => {
  const btnColor = isDisabled ? DISABLED_COLOR : makeColor(themeColor);

  return (
    <StyledRadio
      onClick={isDisabled ? null : onClick}
      $isDisabled={isDisabled}
      $btnColor={btnColor}
      {...props}
    >
      {
        isChecked
          ? <RadioButtonCheckedIcon className="radio__checked-icon" />
          : <RadioButtonUncheckedIcon className="radio__unchecked-icon" />
      }
      {!!children && <span>{children}</span>}
    </StyledRadio>
  );
};

Radio.propTypes = {
  /**
   * 開啟或關閉
   */
  isChecked: PropTypes.bool,
  /**
   * 是否禁用
   */
  isDisabled: PropTypes.bool,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 點擊事件
   */
  onClick: PropTypes.func,
  /**
   * 內容
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

Radio.defaultProps = {
  isChecked: false,
  isDisabled: false,
  themeColor: 'primary',
  onClick: () => {},
  children: '',
};

export default Radio;
