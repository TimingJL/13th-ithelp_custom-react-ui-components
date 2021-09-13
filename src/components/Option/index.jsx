import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useColor } from 'hooks/useColor';

const DISABLED_COLOR = '#dadada';

const StyledOption = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#222222')};

	& > *:not(:first-child) {
		margin-left: 8px;
	}

  .option__checked-icon {
    color: ${(props) => props.$btnColor};
  }

  .option__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#808080')};
  }

  &:hover {
    .option__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$btnColor)};
    }
  }
`;

const Option = ({
  isChecked,
  isDisabled,
  themeColor,
  onClick,
  checkedIcon,
  unCheckedIcon,
  children,
  ...props
}) => {
  const { makeColor } = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledOption
      onClick={isDisabled ? null : onClick}
      $isDisabled={isDisabled}
      $btnColor={btnColor}
      {...props}
    >
      {
        isChecked
          ? (
            React.cloneElement(checkedIcon, {
              className: clsx(checkedIcon.props.className, 'option__checked-icon'),
            })
          )
          : (
            React.cloneElement(unCheckedIcon, {
              className: clsx(unCheckedIcon.props.className, 'option__unchecked-icon'),
            })
          )
      }
      {!!children && <span>{children}</span>}
    </StyledOption>
  );
};

Option.propTypes = {
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
   * 被選中的圖示
   */
  checkedIcon: PropTypes.element,
  /**
   * 未被選中的圖示
   */
  unCheckedIcon: PropTypes.element,
  /**
   * 內容
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

Option.defaultProps = {
  isChecked: false,
  isDisabled: false,
  themeColor: 'primary',
  checkedIcon: <CheckBoxIcon />,
  unCheckedIcon: <CheckBoxOutlineBlankIcon />,
  onClick: () => {},
  children: '',
};

export default Option;
