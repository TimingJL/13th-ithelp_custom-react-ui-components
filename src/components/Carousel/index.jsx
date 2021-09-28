import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

const IMAGE_WIDTH = 600;

const CarouselWrapper = styled.div`
  position: relative;
  width: ${IMAGE_WIDTH}px;
  height: 400px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  left: ${(props) => props.$left}px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: all 0.4s ease;
  z-index: ${(props) => (props.$isCurrent ? 9 : 0)};
`;

const ControlButtons = styled.div`
  color: white;
  position: absolute;
  z-index: 10;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  & > svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
`;

const Dots = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 10;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  & > *:not(:first-child) {
    margin-left: 6px;
  }
`;

const Dot = styled.div`
  border-radius: 100%;
  width: 8px;
  height: 8px;
  border: 1px solid #FFF;
  background: ${(props) => (props.$isCurrent ? '#FFF' : 'none')};
  cursor: pointer;
`;

/**
 * `Carousel` 是一個像旋轉木馬一樣會輪流轉的輪播元件。
 * 在一個內容空間有限的可視範圍中進行內容的輪播展示。通常適用於一組圖片或是卡片的輪播。
*/
const Carousel = ({ className, imageList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getIndexes = () => {
    const prevIndex = currentIndex - 1 < 0 ? imageList.length - 1 : currentIndex - 1;
    const nextIndex = (currentIndex + 1) % imageList.length;

    return {
      prevIndex, nextIndex,
    };
  };

  const makePosition = ({ itemIndex }) => {
    const { prevIndex, nextIndex } = getIndexes();
    if (prevIndex === itemIndex) {
      return -1 * IMAGE_WIDTH;
    }
    if (nextIndex === itemIndex) {
      return IMAGE_WIDTH;
    }
    if (currentIndex === itemIndex) {
      return 0;
    }
    return -1 * IMAGE_WIDTH;
  };

  const handleClickPrev = () => {
    const { prevIndex } = getIndexes();
    setCurrentIndex(prevIndex);
  };

  const handleClickNext = () => {
    const { nextIndex } = getIndexes();
    setCurrentIndex(nextIndex);
  };

  return (
    <CarouselWrapper className={className}>
      <ImageWrapper>
        {
          imageList.map((imageUrl, index) => {
            const { prevIndex, nextIndex } = getIndexes();
            const isVisible = [prevIndex, currentIndex, nextIndex].indexOf(index) > -1;
            return (
              <Image
                key={imageUrl}
                src={imageUrl}
                alt=""
                $left={makePosition({ itemIndex: index })}
                $isVisible={isVisible}
                $isCurrent={index === currentIndex}
              />
            );
          })
        }
      </ImageWrapper>
      <ControlButtons>
        <ArrowLeft onClick={handleClickPrev} />
        <ArrowRight onClick={handleClickNext} />
      </ControlButtons>
      <Dots>
        {
          [...Array(imageList.length).keys()].map((key, index) => (
            <Dot
              key={key}
              $isCurrent={index === currentIndex}
              onClick={() => setCurrentIndex(key)}
            />
          ))
        }
      </Dots>
    </CarouselWrapper>
  );
};

Carousel.propTypes = {
  /**
   * 客製化樣式
   */
  className: PropTypes.string,
  /**
   * 輪播資料
   */
  imageList: PropTypes.arrayOf(PropTypes.string),
};

Carousel.defaultProps = {
  className: '',
  imageList: [],
};

export default Carousel;
