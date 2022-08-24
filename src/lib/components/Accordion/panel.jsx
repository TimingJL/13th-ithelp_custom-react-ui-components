import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPanel = styled.div`
  max-height: ${(props) => props.$maxHeight}px;
	overflow: hidden;
	transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Panel = ({ panel, isExpand }) => {
  const panelRef = useRef(null);
  const scrollHeight = panelRef.current?.scrollHeight;

  return (
    <StyledPanel
      ref={panelRef}
      className="accordion__panel"
      $maxHeight={isExpand ? scrollHeight : 0}
    >
      {panel}
    </StyledPanel>
  );
};

Panel.propTypes = {
  isExpand: PropTypes.bool,
  panel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Panel.defaultProps = {
  isExpand: false,
};

export default Panel;
