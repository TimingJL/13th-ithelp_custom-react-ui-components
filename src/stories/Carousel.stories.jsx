import React, { useState } from 'react';
import styled from 'styled-components';

import Carousel from '../components/Carousel';
import Switch from '../components/Switch';

export default {
  title: '數據展示元件/Carousel',
  component: Carousel,
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

const TemplateControls = (args) => {
  const [hasControlArrow, setHasControlArrow] = useState(true);
  const [hasDots, setHasDots] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  return (
    <SpaceBetween style={{ height: 500 }}>
      <Carousel
        {...args}
        hasControlArrow={hasControlArrow}
        hasDots={hasDots}
        autoplay={autoplay}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Switch
          isChecked={hasControlArrow}
          checkedChildren="顯示切換鍵"
          unCheckedChildren="隱藏切換鍵"
          onChange={(value) => setHasControlArrow(value)}
        />
        <Switch
          style={{ marginTop: 20 }}
          isChecked={hasDots}
          checkedChildren="顯示指示點"
          unCheckedChildren="隱藏指示點"
          onChange={(value) => setHasDots(value)}
        />
        <Switch
          style={{ marginTop: 20 }}
          isChecked={autoplay}
          checkedChildren="自動播放"
          unCheckedChildren="暫停播放"
          onChange={(value) => setAutoplay(value)}
        />
      </div>
    </SpaceBetween>
  );
};

export const Default = TemplateControls.bind({});
Default.args = {
  dataSource: [...Array(5).keys()].map((key) => (
    `https://picsum.photos/id/${130 + key}/600/400`
  )),
};
