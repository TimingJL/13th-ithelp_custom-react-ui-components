import { useState } from 'react';

export const usePagination = ({
  defaultCurrent = 1,
  pageSize = 20,
  total,
  withEllipsis,
}) => {
  const [current, setCurrent] = useState(defaultCurrent);
  const totalPage = Math.ceil(total / pageSize);
  const items = [...Array(totalPage).keys()]
    .map((key) => key + 1)
    .map((page) => ({
      type: 'page',
      isCurrent: current === page,
      page,
      onClick: () => setCurrent(page),
    }));
  const markedItems = items
    .map((item) => {
      const { page } = item;
      if (
        page === totalPage
      || page === 1
      || page === current
      || page === current + 1
      || page === current - 1
      ) {
        return item;
      }
      return {
        ...item,
        type: item.page > current ? 'end-ellipsis' : 'start-ellipsis',
      };
    });
  const ellipsisItems = markedItems
    .filter((item, index) => {
      if (item.type === 'start-ellipsis' && markedItems[index + 1].type === 'start-ellipsis') {
        return false;
      }
      if (item.type === 'end-ellipsis' && markedItems[index + 1].type === 'end-ellipsis') {
        return false;
      }
      return true;
    });

  const handleClickNext = () => {
    const nextCurrent = current + 1 > totalPage ? totalPage : current + 1;
    setCurrent(nextCurrent);
  };

  const handleClickPrev = () => {
    const prevCurrent = current - 1 < 1 ? 1 : current - 1;
    setCurrent(prevCurrent);
  };

  return {
    items: withEllipsis ? ellipsisItems : items,
    current,
    totalPage,
    handleClickNext,
    handleClickPrev,
  };
};

export default { usePagination };
