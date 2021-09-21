import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Upload from '../components/Upload';
import Button from '../components/Button';

export default {
  title: '數據輸入元件/Upload',
  component: Upload,
};

const TemplateDefault = (args) => (
  <Upload
    {...args}
  >
    <Button
      variant="outlined"
      startIcon={<CloudUploadIcon />}
    >
      上傳
    </Button>
  </Upload>
);

export const Default = TemplateDefault.bind({});
Default.args = {};
