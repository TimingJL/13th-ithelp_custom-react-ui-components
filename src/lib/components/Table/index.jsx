/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const stickyLeftStyle = css`
  position: sticky;
  left: 0px;
  z-index: 2;
  &:after {
    content: "";
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 100%;
    box-shadow: inset 10px 0 8px -8px #00000026;
    transform: translateX(100%);
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  * {
    border: 1px solid #000;
    box-sizing: border-box;
  }
`;

const Th = styled.th`
  width: ${(props) => props.$width}px;
  ${(props) => props.$fixed && stickyLeftStyle};
`;

const Td = styled.td`
  background: #FFF;
  ${(props) => props.$fixed && stickyLeftStyle};
`;

/**
 * `Table` 顧名思義就是一個表格元件，用來整齊的顯示行列數據。
*/
const Table = ({
  className,
  columns, dataSource,
}) => (
  <div style={{ width: '100%', overflow: 'auto' }}>
    <StyledTable
      className={className}
      $columnsCount={columns.length}
    >
      <thead>
        <tr>
          {
            columns.map((column) => (
              <Th
                key={column.key}
                $width={column.width}
                $fixed={column.fixed}
              >
                {column.title}
              </Th>
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
                    <Td key={column.key} $fixed={column.fixed}>
                      {foundCellData}
                    </Td>
                  );
                })
              }
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  </div>
);

Table.propTypes = {
  /**
   * 客製化樣式
  */
  className: PropTypes.string,
  /**
   * 描述表格欄位的配置
  */
  columns: PropTypes.array,
  /**
   * 指定表格的數據內容
  */
  dataSource: PropTypes.array,
};

Table.defaultProps = {
  className: '',
  columns: [],
  dataSource: [],
};

export default Table;
