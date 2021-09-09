import React from 'react';

// import { usePagination } from '@material-ui/lab/Pagination';
// import { makeStyles } from '@material-ui/core/styles';
import MuiPagination from '@material-ui/lab/Pagination';
// const useStyles = makeStyles({
//   ul: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//     display: 'flex',
//   },
// });

const Pagination = () => (
  <div>
    pagination
    <MuiPagination
      count={9}
      defaultPage={1}
      siblingCount={0}
      // boundaryCount={0}
    />
    {/* <ul className={classes.ul}>
        {items.map(({
          page, type, selected, ...item
        }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button type="button" style={{ fontWeight: selected ? 'bold' : undefined }} {...item}>
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          // eslint-disable-next-line react/no-array-index-key
          return <li key={index}>{children}</li>;
        })}
      </ul> */}
  </div>
);
export default Pagination;
