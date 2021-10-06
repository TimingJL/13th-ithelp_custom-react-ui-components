import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { usePagination } from 'hooks/usePagination';

const StyledPagination = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const currentItemStyle = css`
  background: ${(props) => props.theme.color.primary};
  color: #FFF;
`;

const StyledItem = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #bbb;
  ${(props) => (props.$isCurrent ? currentItemStyle : null)}
`;

/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
*/
const Pagination = ({
  defaultCurrent,
  pageSize,
  total,
  onChange,
}) => {
  const {
    current,
    items,
    handleClickNext,
    handleClickPrev,
  } = usePagination({
    defaultCurrent,
    pageSize,
    total,
  });

  useEffect(() => {
    onChange({
      current,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <StyledPagination>
      <button
        type="button"
        onClick={handleClickPrev}
      >
        prev
      </button>
      {
        items.map((item) => (
          <StyledItem
            key={item.page}
            $isCurrent={item.isCurrent}
            onClick={item.onClick}
          >
            <span>{item.page}</span>
          </StyledItem>
        ))
      }
      <button
        type="button"
        onClick={handleClickNext}
      >
        next
      </button>
    </StyledPagination>
  );
};

Pagination.propTypes = {
  defaultCurrent: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  defaultCurrent: 1,
  pageSize: 20,
  onChange: () => {},
};

export default Pagination;
