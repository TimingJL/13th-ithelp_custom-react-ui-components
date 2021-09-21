import React, { useState } from 'react';
import styled from 'styled-components';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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

const FilesWrapper = styled.div`
  padding: 20px 0px;
  & > *:not(:first-child) {
    margin-top: 12px;
  }
`;

const FileItem = styled(SpaceBetween)`
  padding: 20px 12px;
  border: 1px solid #DDD;
  border-radius: 4px;
`;

const DeleteButton = styled(DeleteOutlineIcon)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const TemplateDefault = (args) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1);
    setUploadFile(null);
  };

  return (
    <div>
      <SpaceBetween>
        <Upload
          {...args}
          resetKey={resetKey}
          onChange={(files) => setUploadFile(files[0])}
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

const TemplatePreview = (args) => {
  const [resetKey, setResetKey] = useState(0);
  const [imageSrc, setImageSrc] = useState('');

  const handleOnPreview = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setImageSrc(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1);
    setImageSrc(null);
  };

  return (
    <div>
      <SpaceBetween>
        <Upload
          {...args}
          resetKey={resetKey}
          onChange={handleOnPreview}
        >
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            上傳圖片
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
      {imageSrc && <img src={imageSrc} alt="" style={{ marginTop: 20 }} />}
    </div>
  );
};

export const PreviewUploadImage = TemplatePreview.bind({});
PreviewUploadImage.args = {
  accept: 'image/*',
};

const TemplateMultipleUpload = (args) => {
  const [resetKey, setResetKey] = useState(0);
  const [fileList, setFileList] = useState([]);

  const handleOnPreview = (files) => {
    files.forEach((file, index) => {
      setFileList((prev) => [...prev, {
        id: index,
        name: file.name,
      }]);
    });
  };

  const handleDeleteItem = (fileId) => {
    setFileList((prev) => prev.filter((item) => item.id !== fileId));
  };

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1);
    setFileList([]);
  };

  return (
    <div>
      <SpaceBetween>
        <Upload
          {...args}
          resetKey={resetKey}
          onChange={handleOnPreview}
        >
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            上傳圖片
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
      <FilesWrapper>
        {
          fileList.map((file) => (
            <FileItem key={file.id}>
              <div>{file.name}</div>
              <DeleteButton onClick={() => handleDeleteItem(file.id)} />
            </FileItem>
          ))
        }
      </FilesWrapper>
    </div>
  );
};

export const UploadMultiple = TemplateMultipleUpload.bind({});
UploadMultiple.args = {
  accept: 'image/*',
  multiple: true,
};
