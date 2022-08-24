import React from 'react';
import PropTypes from 'prop-types';

import ColorBlock from './colorBlock';
import ColorFlashBlock from './colorFlashBlock';
import BackgroundSlide from './backgroundSlide';

const variantMap = {
  colorBlock: ColorBlock,
  flash: ColorFlashBlock,
  slide: BackgroundSlide,
};

/**
 * `Skeleton` 是一個骨架載入元件(Skeleton Screen Loading)，
 * 跟 Spin 不同的是，Skeleton 幫助我們在頁面載入完成之前可以先看到一個描繪當前頁面大致框架的樣式，
 * 載入完成之後，原本骨架的地方將被真實的資料給替換。
*/
const Skeleton = ({
  variant, ...props
}) => {
  const SkeletonComponent = variantMap[variant] || variantMap.colorBlock;

  return <SkeletonComponent {...props} />;
};

Skeleton.propTypes = {
/**
 * 不同動畫的變換模式
*/
  variant: PropTypes.oneOf(['colorBlock', 'flash', 'slide']),
};

Skeleton.defaultProps = {
  variant: 'slide',
};

export default Skeleton;
