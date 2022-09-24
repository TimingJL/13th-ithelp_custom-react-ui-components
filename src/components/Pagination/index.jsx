import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { usePagination } from 'hooks/usePagination';
import { useColor } from 'hooks/useColor';

const buttonStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    color: #222;
    background: #0000000a;
    transition: background 0.2s ease-in-out;
  }
`;

const disabledButtonStyle = css`
  color: #00000042;
  background: none;
  cursor: default;
  &:hover {
    color: #00000042;
    background: none;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const ArrowButton = styled.div`
  ${buttonStyle}
  ${(props) => (props.$isDisabled ? disabledButtonStyle : null)}
`;

const currentItemStyle = css`
  background: ${(props) => props.$color};
  color: #FFF;
  &:hover {
    background: ${(props) => props.$color};
    color: #FFF;
    transition: background 0.2s ease-in-out;
  }
`;

const StyledItem = styled.div`
  ${buttonStyle}
  ${(props) => (props.$isCurrent ? currentItemStyle : null)}
`;

/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
*/
const Pagination = ({
  themeColor,
  withEllipsis,
  page,
  pageSize,
  total,
  onChange,
}) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const {
    items,
    totalPage,
    handleClickNext,
    handleClickPrev,
  } = usePagination({
    page,
    pageSize,
    total,
    withEllipsis,
    onChange,
  });

  return (
    <StyledPagination>
      <ArrowButton
        role="presentation"
        onClick={page === 1 ? null : handleClickPrev}
        $isDisabled={page === 1}
      >
        <ArrowLeftIcon />
      </ArrowButton>
      {
        items.map((item) => {
          if (item.type === 'page') {
            return (
              <StyledItem
                key={item.page}
                $isCurrent={item.isCurrent}
                $color={color}
                onClick={item.onClick}
              >
                <span>{item.page}</span>
              </StyledItem>
            );
          }
          return (
            <div key={item.page}>
              ...
            </div>
          );
        })
      }
      <ArrowButton
        role="presentation"
        onClick={page === totalPage ? null : handleClickNext}
        $isDisabled={page === totalPage}
      >
        <ArrowRightIcon />
      </ArrowButton>
    </StyledPagination>
  );
};

Pagination.propTypes = {
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor: PropTypes.oneOfType([PropTypes.oneOf(['primary', 'secondary']), PropTypes.string]),
  /**
   * 當前頁數
  */
  page: PropTypes.number,
  /**
   * 每一頁資料筆數
  */
  pageSize: PropTypes.number,
  /**
   * 數據總數
  */
  total: PropTypes.number.isRequired,
  /**
   * 頁數過多是否省略
  */
  withEllipsis: PropTypes.bool,
  /**
   * 頁碼以及 pageSize 改變時的 callback
  */
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  themeColor: 'primary',
  page: 1,
  pageSize: 20,
  withEllipsis: false,
  onChange: () => {},
};

export default Pagination;
