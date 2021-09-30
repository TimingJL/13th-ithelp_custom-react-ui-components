import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledListItem = styled.div`
  border: 1px solid #EEEEEE;
  display: flex;
  padding: 12px 8px;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const ListItem = ({ author, url }) => (
  <StyledListItem>
    <div>{`Author: ${author}`}</div>
  </StyledListItem>
);

ListItem.propTypes = {
  author: PropTypes.string,
  url: PropTypes.string,
};

ListItem.defaultProps = {
  author: '',
  url: '',
};

export default ListItem;
