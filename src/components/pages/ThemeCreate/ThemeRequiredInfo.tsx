import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  form: FormInstance<any>;
}
const ThemeRequiredInfo: React.FC<IProps> = ({ form }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: cafeList } = useQuery(['fetchCafes'], () =>
    api.cafes.fetchCafes({ page: 1, limit: 1000, sort: 'name', order: 'asc' }),
  );

  const getSrcFromFile = (file: any) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  async function handleFilePreview(file: any) {
    let src = file.url || (await getSrcFromFile(file));
    src = `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`;
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  }

  async function handleFileChange(info: UploadChangeParam<UploadFile>) {
    setFileList(info.fileList);
    form.setFieldValue(
      'images',
      info.fileList.map(v => v.url),
    );
  }

  function handleFileUpload(file: RcFile) {
    return new Promise<File | undefined>((resolve, reject) => {
      api.images
        .uploadFile('themes', file as File)
        .then(({ url }) => {
          (file as any).url = url;
          resolve(file);
        })
        .catch(() => {
          reject();
        });
    });
  }

  function handleFileRemove(file: UploadFile<any>) {
    return new Promise<boolean>((resolve, reject) => {
      api.images
        .deleteFile(String(file.url))
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  function handleCafeChange(id: string) {
    form.setFieldValue('cafeId', id);
  }

  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>필수 정보</Typography.Title>
      </Box>

      <Form.Item label="썸네일" name="images" required>
        <ImageUpload
          listType="picture-card"
          maxCount={1}
          fileList={fileList}
          onPreview={handleFilePreview}
          beforeUpload={handleFileUpload}
          onChange={handleFileChange}
          onRemove={handleFileRemove}
        >
          {fileList.length === 0 && '+ Upload'}
        </ImageUpload>
      </Form.Item>
      <Form.Item label="카페" name="cafeId" required>
        <Select
          showSearch
          allowClear
          optionFilterProp="label"
          onChange={handleCafeChange}
        >
          {cafeList?.items.map(item => (
            <Select.Option key={item.id} label={item.name} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="이름" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="설명" name="intro" required>
        <Input.TextArea rows={6} />
      </Form.Item>
    </Section>
  );
};

const ImageUpload = styled(Upload)`
  .ant-upload-select,
  .ant-upload-draggable-list-item {
    width: 207px !important;
    height: 267px !important;
  }
  .ant-upload-list-item-container {
    width: 207px !important;
    height: 267px !important;
  }
  .ant-upload-list-item-image {
    object-fit: cover !important;
  }
  .drop-over-upward,
  .drop-over-downward {
    border: 6px dashed rgb(var(--primary)) !important;
  }
`;

export default ThemeRequiredInfo;
