import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${(props) => (props.theme.color.primary)} !important;
  margin: 40px 0px;
`;

const InfiniteScrollWrapper = styled.div`
  height: ${(props) => props.$height}px;
  overflow: auto;
`;

const InfiniteScroll = ({
  height, onScrollBottom, isLoading, children,
}) => {
  const infiniteScrollRef = useRef();

  const handleOnScroll = () => {
    const containerElem = infiniteScrollRef.current;
    if (containerElem) {
      const scrollPos = containerElem.scrollTop + containerElem.clientHeight;
      const divHeight = containerElem.scrollHeight;

      // 滾過的距離加上自己元素的高度，大於等於可滾動範圍的高度
      if ((scrollPos >= divHeight) && onScrollBottom) {
        onScrollBottom();
      }
    }
  };

  return (
    <InfiniteScrollWrapper
      ref={infiniteScrollRef}
      $height={height}
      onScroll={handleOnScroll}
    >
      {children}
      {isLoading && (
        <Loading>
          <StyledCircularProgress />
        </Loading>
      )}
    </InfiniteScrollWrapper>
  );
};

InfiniteScroll.propTypes = {
  /**
   * 元件高度
   */
  height: PropTypes.number,
  /**
   * 內容
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * 載入中狀態
   */
  isLoading: PropTypes.bool,
  /**
   * 滑動到底部的 callback
   */
  onScrollBottom: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  height: 500,
  isLoading: false,
  onScrollBottom: undefined,
};

export default InfiniteScroll;
