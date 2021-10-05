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
  const [tabAttrList, setTabAttrList] = useState([]);

  const handleClickTab = ({ tabValue, tabIndex }) => {
    onChange(tabValue);
    setActiveIndex(tabIndex);
  };

  useEffect(() => {
    const tabGroupCurrent = tabGroupRef.current;
    const tabNumber = React.Children.count(children);

    setTabAttrList(
      [...Array(tabNumber).keys()]
        .map((tabIndex) => ({
          width: tabGroupCurrent.children[tabIndex].offsetWidth,
          left: tabGroupCurrent.children[tabIndex].offsetLeft,
        })),
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
        $left={tabAttrList[activeIndex]?.left || 0}
        $width={tabAttrList[activeIndex]?.width || 0}
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
