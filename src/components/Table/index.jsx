/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTable = styled.div`
  display: inline-block;
  border-collapse: collapse;
  * {
    border: 1px solid #000;
  }
`;

/**
 * `Table` 顧名思義就是一個表格元件，用來整齊的顯示行列數據。
*/
const Table = ({
  columns, dataSource,
}) => (
  <StyledTable>
    <thead>
      <tr>
        {
          columns.map((column) => (
            <th key={column.key}>
              {column.title}
            </th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        dataSource.map((data) => (
          <tr key={data.key}>
            {
              columns.map((column) => {
                const { dataIndex } = column;
                const foundCellData = column.render
                  ? column.render(data[dataIndex])
                  : data[dataIndex];
                return (
                  <td key={column.key}>
                    {foundCellData}
                  </td>
                );
              })
            }
          </tr>
        ))
      }
    </tbody>
  </StyledTable>
);

Table.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
};

Table.defaultProps = {
  columns: [],
  dataSource: [],
};

export default Table;
