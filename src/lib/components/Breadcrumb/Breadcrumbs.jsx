import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const StyledBreadcrumbs = styled.div`
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0px 8px;
  display: flex;
  align-items: center;
`;

const CollapsedContent = styled.span`
  cursor: pointer;
`;

const Breadcrumbs = ({ children, maxItems, separator }) => {
  const [isCollapse, setIsCollapse] = useState(
    maxItems < React.Children.count(children),
  );

  if (isCollapse) {
    return (
      <StyledBreadcrumbs>
        {children[0]}
        <Separator>{separator}</Separator>
        <CollapsedContent
          role="presentation"
          onClick={() => setIsCollapse(false)}
        >
          ...
        </CollapsedContent>
        <Separator>{separator}</Separator>
        {children[React.Children.count(children) - 1]}
      </StyledBreadcrumbs>
    );
  }

  return (
    <StyledBreadcrumbs>
      {
        React.Children.map(children, (child, index) => {
          const isLast = index === React.Children.count(children) - 1;
          return (
            <>
              {child}
              {isLast ? null : <Separator>{separator}</Separator>}
            </>
          );
        })
      }
    </StyledBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  maxItems: PropTypes.number,
};

Breadcrumbs.defaultProps = {
  separator: <ArrowForwardIosIcon />,
  maxItems: 8,
};

export default Breadcrumbs;
