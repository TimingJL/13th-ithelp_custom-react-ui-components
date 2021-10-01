import React from 'react';
import PropTypes from 'prop-types';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbItem from './BreadcrumbItem';

/**
 * `Breadcrumb` 是一個導航元件，用於顯示當前系統層級結構中的路徑位置，並且點擊路徑能返回之前的頁面。
 * 在系統有多個層級架構，並且希望能幫助用戶清楚知道自己目前層級位置，
 * 及希望用戶能方便返回上面層級時，能夠使用麵包屑元件。
*/
const Breadcrumb = ({ maxItems, routes, separator }) => (
  <Breadcrumbs
    maxItems={maxItems}
    separator={separator}
  >
    {
        routes.map((route) => (
          <BreadcrumbItem
            key={route.label}
            label={route.label}
            icon={route.icon}
            to={route.to}
          />
        ))
      }
  </Breadcrumbs>
);

Breadcrumb.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  routes: PropTypes.array,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxItems: PropTypes.number,
};

Breadcrumb.defaultProps = {
  routes: [],
  separator: <ArrowForwardIosIcon />,
  maxItems: 8,
};

export default Breadcrumb;
