/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabsScrollerWrapper = styled.div`
  position: relative;
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 0px;
  left: ${(props) => props.$left}px;
  height: 2px;
  width: ${(props) => props.$width}px;
  background: ${(props) => props.$color};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledTabGroup = styled.div`
  display: flex;
`;

const TabGroup = ({
  className,
  value,
  children, onChange,
  color,
  ...props
}) => {
  const tabGroupRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabWidthList, setTabWidthList] = useState([]);
  let indicatorLeft = 0;
  tabWidthList.forEach((tabWidth, tabIndex) => {
    if (tabIndex < activeIndex) {
      indicatorLeft += tabWidth;
    }
  });

  const handleClickTab = ({ tabValue, tabIndex }) => {
    onChange(tabValue);
    setActiveIndex(tabIndex);
  };

  useEffect(() => {
    const tabGroupCurrent = tabGroupRef.current;
    const tabNumber = React.Children.count(children);

    setTabWidthList(
      [...Array(tabNumber).keys()]
        .map((tabIndex) => tabGroupCurrent.children[tabIndex].offsetWidth),
    );
  }, [children]);

  return (
    <TabsScrollerWrapper className={className} {...props}>
      <StyledTabGroup ref={tabGroupRef} className="tab__tab-group">
        {React.Children.map(children, (child, tabIndex) => (
          React.cloneElement(child, {
            onClick: () => handleClickTab({
              tabValue: child.props.value,
              tabIndex,
            }),
            isActive: child.props.value === value,
            color,
          })
        ))}
      </StyledTabGroup>
      <Indicator
        $left={indicatorLeft}
        $width={tabWidthList[activeIndex]}
        $color={color}
      />
    </TabsScrollerWrapper>
  );
};

TabGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onChange: PropTypes.func,
  value: PropTypes.string,
  color: PropTypes.string,
};

TabGroup.defaultProps = {
  className: '',
  children: null,
  onChange: () => {},
  value: '',
  color: '',
};

export default TabGroup;
