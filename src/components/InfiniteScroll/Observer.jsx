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

/**
 * `Infinite scroll` 能在面對多筆資料時，讓捲軸滑動到底部時再載入下一頁面的資料。
*/
const InfiniteScroll = ({
  onScrollBottom, children,
}) => {
  const loadingRef = useRef();

  React.useEffect(() => {
    const loadingElem = loadingRef.current;
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onScrollBottom();
      }
    });
    if (loadingElem) {
      intersectionObserver.observe(loadingElem, {
        threshold: 0.5,
      });
    }
    return () => {
      intersectionObserver.unobserve(loadingElem);
    };
  }, []);

  return (
    <InfiniteScrollWrapper>
      {children}
      <Loading ref={loadingRef}>
        <StyledCircularProgress />
      </Loading>
    </InfiniteScrollWrapper>
  );
};

InfiniteScroll.propTypes = {
  /**
   * 元件高度
   */
  // height: PropTypes.number,
  /**
   * 內容
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * 載入中狀態
   */
  // isLoading: PropTypes.bool,
  /**
   * 滑動到底部的 callback
   */
  onScrollBottom: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  // height: 500,
  // isLoading: false,
  onScrollBottom: undefined,
};

export default InfiniteScroll;
