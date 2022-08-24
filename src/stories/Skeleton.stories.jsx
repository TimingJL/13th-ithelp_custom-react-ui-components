/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import Skeleton from '../lib/components/Skeleton';

export default {
  title: '反饋元件/Skeleton',
  component: Skeleton,
};

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const TextLineWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 12px;
  }
`;

const Avatar = ({ style, ...props }) => (
  <Skeleton style={{ width: 50, height: 50, ...style }} {...props} />
);

const TextLine = ({ style, ...props }) => (
  <Skeleton style={{ width: 50, height: 12, ...style }} {...props} />
);

const Template = ({ variant }) => (
  <SkeletonWrapper>
    <Avatar variant={variant} />
    <TextLineWrapper>
      <TextLine variant={variant} style={{ width: 300 }} />
      <TextLine variant={variant} style={{ width: 230 }} />
    </TextLineWrapper>
  </SkeletonWrapper>
);

export const Default = Template.bind({});

export const WithoutAnimation = Template.bind({});
WithoutAnimation.args = {
  variant: 'colorBlock',
};

export const FlashAnimation = Template.bind({});
FlashAnimation.args = {
  variant: 'flash',
};

export const BackgroundSlide = Template.bind({});
BackgroundSlide.args = {
  variant: 'slide',
};
