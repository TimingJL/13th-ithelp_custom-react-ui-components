import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

const CarouselWrapper = styled.div`
  position: relative;
  width: ${(props) => props.$width}px;
  height: 400px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: black;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  left: ${(props) => props.$left}px;
  transition: all 0.4s ease;
  object-fit: cover;
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
  align-items: center;
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
  width: ${(props) => (props.$isCurrent ? 10 : 8)}px;
  height: ${(props) => (props.$isCurrent ? 10 : 8)}px;
  border: 1px solid #FFF;
  background: ${(props) => (props.$isCurrent ? '#FFF' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

/**
 * `Carousel` 是一個像旋轉木馬一樣會輪流轉的輪播元件。
 * 在一個內容空間有限的可視範圍中進行內容的輪播展示。通常適用於一組圖片或是卡片的輪播。
*/
const Carousel = ({
  className, dataSource, hasDots, hasControlArrow, autoplay,
}) => {
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(600);
  const getIndexes = () => {
    const prevIndex = currentIndex - 1 < 0 ? dataSource.length - 1 : currentIndex - 1;
    const nextIndex = (currentIndex + 1) % dataSource.length;

    return {
      prevIndex, nextIndex,
    };
  };

  const makePosition = ({ itemIndex }) => (itemIndex - currentIndex) * imageWidth;

  const handleClickPrev = () => {
    const { prevIndex } = getIndexes();
    setCurrentIndex(prevIndex);
  };

  const handleClickNext = useCallback(() => {
    const { nextIndex } = getIndexes();
    setCurrentIndex(nextIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleUpdateCarouselWidth = () => {
    const carouselWidth = carouselRef.current.clientWidth;
    setImageWidth(carouselWidth);
  };

  useEffect(() => {
    handleUpdateCarouselWidth();
    window.addEventListener('resize', handleUpdateCarouselWidth);
    return () => {
      window.removeEventListener('resize', handleUpdateCarouselWidth);
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (autoplay) {
      intervalId = setInterval(() => {
        handleClickNext();
      }, 3000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [autoplay, handleClickNext]);

  return (
    <CarouselWrapper
      ref={carouselRef}
      className={className}
      $width={imageWidth}
    >
      <ImageWrapper>
        {
          dataSource.map((imageUrl, index) => (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt=""
              $left={makePosition({ itemIndex: index })}
            />
          ))
        }
      </ImageWrapper>
      {hasControlArrow && (
        <ControlButtons>
          <ArrowLeft onClick={handleClickPrev} />
          <ArrowRight onClick={handleClickNext} />
        </ControlButtons>
      )}
      {hasDots && (
        <Dots>
          {
            [...Array(dataSource.length).keys()].map((key, index) => (
              <Dot
                key={key}
                $isCurrent={index === currentIndex}
                onClick={() => setCurrentIndex(key)}
              />
            ))
          }
        </Dots>
      )}
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
  dataSource: PropTypes.arrayOf(PropTypes.string),
  /**
   * 是否顯示指示點
   */
  hasDots: PropTypes.bool,
  /**
   * 是否顯示上一個、下一個切換鍵
   */
  hasControlArrow: PropTypes.bool,
  /**
   * 是否自動播放
   */
  autoplay: PropTypes.bool,
};

Carousel.defaultProps = {
  className: '',
  dataSource: [],
  hasDots: true,
  hasControlArrow: true,
  autoplay: false,
};

export default Carousel;
