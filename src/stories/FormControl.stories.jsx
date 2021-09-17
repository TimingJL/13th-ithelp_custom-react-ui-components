import React from 'react';
import styled from 'styled-components';

import FormControl from '../components/FormControl';
import TextField from '../components/TextField';
import Radio from '../components/Radio';
import Switch from '../components/Switch';

export default {
  title: '數據輸入元件/FormControl',
  component: FormControl,
};

const Template = (args) => <FormControl {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: '請輸入資料',
  children: <TextField placeholder="請輸入" />,
};

export const Required = Template.bind({});
Required.args = {
  label: '請輸入資料',
  isRequired: true,
  children: <TextField placeholder="請輸入" />,
};

export const LimitMaxLength = Template.bind({});
LimitMaxLength.args = {
  label: '請輸入資料',
  maxLength: 12,
  children: <TextField placeholder="請輸入" />,
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  isError: true,
  errorMessage: '請檢查輸入是否錯誤',
  label: '請輸入資料',
  children: <TextField placeholder="請輸入" />,
};

const Row = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 40px;
  }
`;

const Column = styled.div`
  & > *:not(:first-child) {
    margin-top: 40px;
  }
`;

const TemplateWithPlacement = (args) => (
  <Column>
    <Row>
      <FormControl {...args} placement="top-left" label="左上標題" />
      <FormControl {...args} placement="top" label="正上標題" />
      <FormControl {...args} placement="top-right" label="右上標題" />
    </Row>
    <Row><FormControl {...args} placement="left" label="左邊標題" /></Row>
    <Row><FormControl {...args} placement="right" label="右邊標題" /></Row>
    <Row>
      <FormControl {...args} placement="bottom-left" label="左下標題" />
      <FormControl {...args} placement="bottom" label="正下標題" />
      <FormControl {...args} placement="bottom-right" label="右下標題" />
    </Row>
  </Column>
);

export const WithDiffPlacementLabel = TemplateWithPlacement.bind({});
WithDiffPlacementLabel.args = {
  children: <TextField placeholder="請輸入" />,
};

export const RadioWithLabel = TemplateWithPlacement.bind({});
RadioWithLabel.args = {
  children: <Radio />,
};

export const SwitchWithLabel = TemplateWithPlacement.bind({});
SwitchWithLabel.args = {
  children: <Switch />,
};
