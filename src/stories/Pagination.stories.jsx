import React, { useState } from 'react';
import styled from 'styled-components';

import Pagination from '../lib/components/Pagination';
import SimplePagination from '../lib/components/Pagination/simple';

export default {
  title: '導航元件/Pagination',
  component: Pagination,
};

const WithDataWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const DataItem = styled.div`
  border: 1px solid #EEE;
  padding: 4px 8px;
`;

const fakeData = [...Array(102).keys()].map((key) => ({
  id: key,
  title: `Index: ${key}`,
}));

const Template = () => (
  <SimplePagination
    total={100}
  />
);

const TemplateEllipsis = () => (
  <Pagination
    pageSize={8}
    total={100}
    withEllipsis
  />
);

const TemplateMuiColored = () => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);

  return (
    <div>
      <div
        style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}
      >
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
        />
      </div>
      <Pagination
        total={100}
        themeColor={pickedColor}
      />
    </div>

  );
};

const TemplateWithData = () => {
  const defaultCurrent = 1;
  const pageSize = 20;
  const [dataSource, setDataSource] = useState([]);
  const handleOnChange = ({ current }) => {
    const max = current * pageSize;
    const min = max - pageSize + 1;
    setDataSource(fakeData.filter((data, index) => index + 1 >= min && index + 1 <= max));
  };

  return (
    <WithDataWrapper>
      <div style={{ height: 650 }}>
        {dataSource.map((data) => (
          <DataItem key={data.id}>
            <div>{data.title}</div>
          </DataItem>
        ))}
      </div>
      <SimplePagination
        defaultCurrent={defaultCurrent}
        pageSize={pageSize}
        total={fakeData.length}
        onChange={handleOnChange}
      />
    </WithDataWrapper>
  );
};

export const Default = Template.bind({});

export const WithDataSource = TemplateWithData.bind({});

export const MuiStyle = TemplateMuiColored.bind({});

export const WithEllipsis = TemplateEllipsis.bind({});
