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
  visibility : ${(props) => (props.$isLoading ? 'visible' : 'hidden')};
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
      <Loading>
        <StyledCircularProgress $isLoading={isLoading} />
      </Loading>
    </InfiniteScrollWrapper>
  );
};

InfiniteScroll.propTypes = {
  height: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isLoading: PropTypes.bool,
  onScrollBottom: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  height: 500,
  isLoading: false,
  onScrollBottom: undefined,
};

export default InfiniteScroll;
