import React, { useState, useRef, useEffect } from 'react';
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
      width: ${(props) => props.$currentValue}%;
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
  onChange,
  themeColor,
  ...props
}) => {
  const sliderRef = useRef();
  const [currentValue, setCurrentValue] = useState();
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  const handleOnChange = (event) => {
    setCurrentValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    setCurrentValue(sliderRef.current.value);
  }, []);

  return (
    <StyledSlider
      ref={sliderRef}
      $currentValue={currentValue}
      $color={color}
      type="range"
      min="0"
      max="100"
      defaultValue={80}
      onChange={handleOnChange}
      {...props}
    />
  );
};

Slider.propTypes = {
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
  themeColor: 'primary',
  onChange: () => {},
};

export default Slider;
