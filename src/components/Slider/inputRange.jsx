import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useColor } from 'hooks/useColor';

const SIZE_THUMB = 20;

const railStyle = css`
  background: #ddd; /* rail color */
  width: 320px;
  height: 6px;
  border-radius: 5px;
`;

const trackStyle = css`
  background: ${(props) => props.$color};
  border-radius: 5px;
  height: 6px;
`;

const StyledSlider = styled.input`
	&[type='range'] {
		-webkit-appearance: none;
		outline: none;
    position: relative;
    z-index: 0;
    ${railStyle}

    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      width: ${(props) => props.$widthRatio}%;
      left: 0px;
      ${trackStyle}
    }
	}

	&[type='range']::-webkit-slider-thumb {
    /* thumb style */
		-webkit-appearance: none;
		width: ${SIZE_THUMB}px;
		height: ${SIZE_THUMB}px;
		border-radius: 50%;
		border: 2px solid white;
		background: white;
		border: 0.4em solid ${(props) => props.$color};
		cursor: pointer;
		transition: box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out;
		&:hover {
			transform: scale(1.1);
			box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.15);
		}
		&:active {
			cursor: grabbing;
			transform: scale(0.975);
			box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
      background: ${(props) => props.$color};
		}
	}
`;

/**
 * `Slider` 是一個滑動型輸入器，允許使用者在數值區間內進行選擇，選擇的值可為連續值或是離散值。
 */
const Slider = ({
  min,
  max,
  step,
  defaultValue,
  onChange,
  themeColor,
  ...props
}) => {
  const sliderRef = useRef();
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  const handleOnChange = (event) => {
    setCurrentValue(sliderRef.current.value);
    onChange(event);
  };

  return (
    <StyledSlider
      ref={sliderRef}
      $widthRatio={(currentValue / max) * 100}
      $color={color}
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={handleOnChange}
      {...props}
    />
  );
};

Slider.propTypes = {
  /**
   * 預設值
   */
  defaultValue: PropTypes.number,
  /**
   * 最小值
   */
  min: PropTypes.number,
  /**
   * 最大值
   */
  max: PropTypes.number,
  /**
   * 步長，取值必須大於 0，並且可被 (max - min) 整除
   */
  step: PropTypes.number,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 數值改變的 callback function
   */
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  step: 1,
  themeColor: 'primary',
  onChange: () => {},
};

export default Slider;
