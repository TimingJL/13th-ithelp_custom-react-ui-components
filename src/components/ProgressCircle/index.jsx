/* eslint-disable react/forbid-prop-types */
import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useColor } from 'hooks/useColor';

const INFINITE = 999999;

const counterClockwiseStyle = css`
  .progress-circle__progress {
    transform: rotateY(180deg);
  }
`;

const StyledProgressCircle = styled.div`
  position: relative;
  display: inline-flex;
  width: 100px;
  height: 100px;
  ${(props) => (props.$isClockwise ? null : counterClockwiseStyle)}

  svg {
    transform: rotate(-90deg);
  }

  circle {
    stroke-width: ${(props) => props.$borderWidth}px;
    fill: transparent;
  }

  .progress-circle__rail {
    stroke: #EEE;
  }

  .progress-circle__track {
    stroke: ${(props) => (props.$strokeColor ? 'url(#linearGradient)' : props.$color)};
    stroke-dasharray: ${(props) => props.$argLength} ${INFINITE};
    transition: stroke-dasharray 0.5s linear;
  }
`;

const Info = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .progress-circle__value {
    font-size: ${(props) => props.$size / 4}px;
  }
  .progress-circle__percent-sign {
    font-size: ${(props) => props.$size / 6}px;
  }
`;

const formatValue = (value) => {
  if (value > 100) {
    return 100;
  }
  if (value < 0) {
    return 0;
  }
  return value;
};

/**
 * `Progress circle` 跟 Progress bar 一樣是能夠展示當前進度的元件。
 * 在外觀上面以圓形替代長條形，好處是在寬度不夠的排版空間當中能夠節省空間。
*/
const ProgressCircle = ({
  className,
  themeColor,
  value,
  isClockwise,
  strokeColor,
}) => {
  const progressCircleRef = useRef();
  const [size, setSize] = useState(0);
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const defaultBorderWidth = size * 0.08;
  const radius = (size - defaultBorderWidth) / 2;
  const perimeter = radius * 2 * Math.PI; // 圓周長
  const argLength = perimeter * (formatValue(value) / 100); // 弧長

  const handleUpdateSize = useCallback(() => {
    const currentElem = progressCircleRef.current;
    setSize(currentElem.clientWidth);
  }, []);

  useEffect(() => {
    handleUpdateSize();
    window.addEventListener('resize', handleUpdateSize);
    return () => {
      window.removeEventListener('resize', handleUpdateSize);
    };
  }, [handleUpdateSize]);

  return (
    <StyledProgressCircle
      ref={progressCircleRef}
      className={className}
      $color={color}
      $borderWidth={defaultBorderWidth}
      $argLength={argLength}
      $isClockwise={isClockwise}
      $strokeColor={strokeColor}
    >
      <span className="progress-circle__progress">
        <svg
          width={size}
          height={size}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          {strokeColor && (
            <defs>
              <linearGradient
                id="linearGradient"
              >
                {
                  Object.keys(strokeColor || {}).map((colorKey) => (
                    <stop
                      key={colorKey}
                      offset={colorKey}
                      stopColor={strokeColor[colorKey]}
                    />
                  ))
                }
              </linearGradient>
            </defs>
          )}
          <circle
            className="progress-circle__rail"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {value > 0 && (
            <circle
              className="progress-circle__track"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              strokeLinecap="round"
            />
          )}
        </svg>
      </span>
      <Info
        className="progress-circle__info"
        $size={size}
      >
        <span className="progress-circle__value">{value}</span>
        <span className="progress-circle__percent-sign">%</span>
      </Info>
    </StyledProgressCircle>
  );
};

ProgressCircle.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 進度
   */
  value: PropTypes.number,
  /**
   * track 是否為順時針方向，若 false 則為逆時針方向
   */
  isClockwise: PropTypes.bool,
  /**
   * 定義 track 漸層顏色
   */
  strokeColor: PropTypes.object,
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
};

ProgressCircle.defaultProps = {
  className: '',
  value: 0,
  themeColor: 'primary',
  isClockwise: true,
  strokeColor: undefined,
};

export default ProgressCircle;
