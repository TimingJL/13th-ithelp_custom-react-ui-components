import React, { useState } from 'react';
import styled from 'styled-components';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import birdImg from './assets/bird.jpeg';
import duckImg from './assets/duck.jpeg';
import eagleImg from './assets/eagle.jpeg';
import frogImg from './assets/frog.jpeg';

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

const PictureWallWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-gap: 8px;
`;

const PictureWallUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: 1px dashed #DDD;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border: 1px dashed ${(props) => props.theme.color.primary};
  }
`;

const PictureItem = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  .picture-item__delete-button {
    display: none;
  }
  &:hover {
    .picture-item__delete-button {
      display: flex;
    }
  }
`;

const DeleteButtonMask = styled.div`
  position: absolute;
  background: #1d1010aa;
  color: #FFF;
  cursor: pointer;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      {imageSrc && <img src={imageSrc} alt="" style={{ marginTop: 20, objectFit: 'cover' }} />}
    </div>
  );
};

export const PreviewUploadImage = TemplatePreview.bind({});
PreviewUploadImage.args = {
  accept: 'image/*',
};

const TemplateMultipleUpload = (args) => {
  const [resetKey, setResetKey] = useState(0);
  const [fileList, setFileList] = useState([
    {
      id: 'test-1',
      name: '檔案01',
    },
    {
      id: 'test-2',
      name: '檔案02',
    },
    {
      id: 'test-3',
      name: '檔案03',
    },
  ]);

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

const TemplatePictureWall = (args) => {
  const [fileList, setFileList] = useState([
    {
      id: 0,
      imageUrl: birdImg,
    },
    {
      id: 1,
      imageUrl: duckImg,
    },
    {
      id: 2,
      imageUrl: eagleImg,
    },
    {
      id: 3,
      imageUrl: frogImg,
    },
  ]);

  const handleOnPreview = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setFileList((prev) => [...prev, {
        id: file.size,
        imageUrl: reader.result,
      }]);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteItem = (fileId) => {
    setFileList((prev) => prev.filter((item) => item.id !== fileId));
  };

  return (
    <PictureWallWrapper>
      {
        fileList.map((file) => (
          <PictureItem key={file.id}>
            <img src={file.imageUrl} alt="" width={150} height={150} style={{ objectFit: 'cover' }} />
            <DeleteButtonMask
              className="picture-item__delete-button"
              onClick={() => handleDeleteItem(file.id)}
            >
              <DeleteOutlineIcon />
            </DeleteButtonMask>
          </PictureItem>
        ))
      }
      <Upload
        {...args}
        onChange={handleOnPreview}
      >
        <PictureWallUpload>
          <div style={{ fontSize: 32 }}>＋</div>
          <div>上傳照片</div>
        </PictureWallUpload>
      </Upload>
    </PictureWallWrapper>
  );
};

export const PictureWall = TemplatePictureWall.bind({});
PictureWall.args = {
  accept: 'image/*',
};
