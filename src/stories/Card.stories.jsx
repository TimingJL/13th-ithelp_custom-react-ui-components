import React from 'react';
import styled from 'styled-components';

import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Card from '../components/Card';
import Meta from '../components/Card/Meta';

export default {
  title: '數據展示元件/Card',
  component: Card,
};

const Actions = styled.div`
  padding: 16px 16px 4px 16px;
  color: #888;
  & > svg {
    cursor: pointer;
  }
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const VariantGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Template = (args) => <Card {...args} />;

const TemplateVariant = (args) => (
  <VariantGroup>
    <Card {...args} style={{ width: 300 }} />
    <Card {...args} variant="horizontal" />
    <Card {...args} variant="horizontal-reverse" />
  </VariantGroup>
);

const defaultArgs = {
  cover: (
    <img src="https://ithelp.ithome.com.tw/static/2021ironman/event/img/fb.jpg" alt="" />
  ),
  children: (
    <Meta
      avatarUrl="https://ithelp.ithome.com.tw/static/2021ironman/event/img/choose1.png"
      title="2021 iThome 鐵人賽"
      description="喚醒心中最強大的鐵人"
    />
  ),
  footer: (
    <Actions>
      <ThumbUpIcon />
      <ShareIcon />
      <NotificationsIcon />
    </Actions>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Variant = TemplateVariant.bind({});
Variant.args = {
  ...defaultArgs,
};
