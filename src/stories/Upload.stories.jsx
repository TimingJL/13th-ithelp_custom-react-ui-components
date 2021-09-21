import React, { useState } from 'react';
import styled from 'styled-components';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Upload from '../components/Upload';
import Button from '../components/Button';

export default {
  title: '數據輸入元件/Upload',
  component: Upload,
};

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TemplateDefault = (args) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <div>
      <SpaceBetween>
        <Upload
          {...args}
          resetKey={resetKey}
          onChange={(files) => setUploadFile(files ? files[0] : null)}
        >
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            上傳
          </Button>
        </Upload>
        <Button
          variant="outlined"
          startIcon={<RotateLeftIcon />}
          onClick={handleResetUpload}
        >
          重設
        </Button>
      </SpaceBetween>
      {uploadFile && (
        <div style={{ marginTop: 20 }}>
          <div>
            檔案名稱：
            <span>{uploadFile.name}</span>
          </div>
          <div>
            檔案類型：
            <span>{uploadFile.type}</span>
          </div>
          <div>
            檔案大小：
            <span>{`${uploadFile.size} Bytes`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Default = TemplateDefault.bind({});
Default.args = {};
