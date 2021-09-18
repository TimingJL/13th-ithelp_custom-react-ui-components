import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';
import {
  map,
  concatMap,
  takeUntil,
} from 'rxjs/operators';

const SIZE_THUMB = 20;

const CustomSliderContainer = styled.div`
  width: 320px;
  height: 6px;
  background: #ddd; /* rail */
  border-radius: 5px;
  position: relative;

  .custom-slider__thumb {
    width: ${SIZE_THUMB}px;
    height: ${SIZE_THUMB}px;
    border-radius: 100%;
    background: ${(props) => props.theme.color.primary};
    position: absolute;
    top: 50%;
    left: ${(props) => props.$thumbPosX}px;
    transform: translateY(-50%) translateX(-50%);
    cursor: pointer;
  }

  &:before {
    /* track */
    content: '';
    position: absolute;
    height: 6px;
    border-radius: 5px;
    width: ${(props) => props.$thumbPosX}px;
    background: ${(props) => props.theme.color.primary};
  }
`;

const calculateTrackWidth = ({ min, max, width }) => {
  if (width < min) return min;
  if (width > max) return max;
  return width;
};

const widthToValue = ({ min, max, ratio }) => (max - min) * ratio;
const valueToWidth = ({
  min, max, value, railWidth,
}) => (value / (max - min)) * railWidth;

const CustomSlider = ({
  min, max, defaultValue, onChange,
}) => {
  const thumbRef = useRef();
  const railRef = useRef();
  const [thumbPosX, setThumbPosX] = useState(0);

  const handleUpdatePosition = ({ mousePosX }) => {
    const railDOM = railRef.current;
    const railWidth = railDOM.clientWidth;
    const railPosX = railDOM.getBoundingClientRect().x;
    const trackWidth = calculateTrackWidth({
      min: 0,
      max: railWidth,
      width: mousePosX - railPosX,
    });
    setThumbPosX(trackWidth);
    onChange(widthToValue({
      min,
      max,
      ratio: trackWidth / railWidth,
    }));
  };

  useEffect(() => { // 監聽 thumb 拖曳行為以改變 thumb 位置
    const thumbDOM = thumbRef.current;
    const { body } = document;
    const mouseDown = fromEvent(thumbDOM, 'mousedown');
    const mouseUp = fromEvent(body, 'mouseup');
    const mouseMove = fromEvent(body, 'mousemove');
    mouseDown
      .pipe(
        concatMap(() => mouseMove.pipe(takeUntil(mouseUp))),
        map((moveEvent) => moveEvent.clientX),
      )
      .subscribe((mousePosX) => {
        handleUpdatePosition({ mousePosX });
      });
  }, []);

  useEffect(() => { // 點擊 track bar 可以使 thumb 直接跳到被點擊位置
    const railDOM = railRef.current;
    const mouseDown = fromEvent(railDOM, 'mousedown');
    mouseDown
      .pipe(
        map((mouseEvent) => mouseEvent.clientX),
      )
      .subscribe((mousePosX) => {
        handleUpdatePosition({ mousePosX });
      });
  }, []);

  useEffect(() => { // set default value
    const railDOM = railRef.current;
    const railWidth = railDOM.clientWidth;
    const defaultWidth = valueToWidth({
      min, max, value: defaultValue, railWidth,
    });
    setThumbPosX(defaultWidth);
  }, []);

  return (
    <CustomSliderContainer
      ref={railRef}
      $thumbPosX={thumbPosX}
    >
      <div ref={thumbRef} className="custom-slider__thumb" />
    </CustomSliderContainer>
  );
};

CustomSlider.propTypes = {
  /**
   * 最小值
   */
  min: PropTypes.number,
  /**
   * 最大值
   */
  max: PropTypes.number,
  /**
   * 預設數值
   */
  defaultValue: PropTypes.number,
  /**
   * 最大值
   */
  onChange: PropTypes.func,
};

CustomSlider.defaultProps = {
  min: 0,
  max: 100,
  defaultValue: 50,
  onChange: () => {},
};

export default CustomSlider;
