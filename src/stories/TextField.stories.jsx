import React from 'react';
import styled from 'styled-components';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '../lib/components/TextField';

export default {
  title: '數據輸入元件/TextField',
  component: TextField,
};

const FullWidthTextField = styled(TextField)`
  width: 100%;
`;

const Template = (args) => <TextField {...args} />;

const TemplateFullWidth = (args) => <FullWidthTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Text Field',
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  prefix: <InputAdornment position="start">$</InputAdornment>,
  placeholder: '請輸入金額',
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: (
    <SearchIcon style={{ color: '#0000008a' }} />
  ),
  placeholder: '搜尋',
};

export const FullWidth = TemplateFullWidth.bind({});
FullWidth.args = {
  placeholder: 'Full width text field',
};

export const ErrorStyle = Template.bind({});
ErrorStyle.args = {
  placeholder: 'Error Text Field',
  isError: true,
};

export const DisabledStyle = Template.bind({});
DisabledStyle.args = {
  placeholder: 'Disabled Text Field',
  isDisabled: true,
};
