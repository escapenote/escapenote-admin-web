import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import update from 'immutability-helper';
import { Form, FormInstance, Typography, Upload, UploadFile } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';
import DragableUploadListItem from './DragableUploadListItem';

const ImgCrop = dynamic(() => import('antd-img-crop'), { ssr: false });

interface IProps {
  form: FormInstance<any>;
}
const CafeImage: React.FC<IProps> = ({ form }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const naverPhotos = Form.useWatch('naverPhotos', form);

  useEffect(() => {
    if (naverPhotos) {
      setFileList(
        naverPhotos.map((v: string) => ({
          uid: v,
          name: v,
          thumbUrl: v,
          url: v,
          status: 'done',
        })),
      );
      form.setFieldValue('images', naverPhotos);
    }
    return () => {
      setFileList([]);
    };
  }, [naverPhotos]);

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = fileList[dragIndex];
      const updatedList = update(fileList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setFileList(updatedList);
      form.setFieldValue(
        'images',
        updatedList.map(v => v.url),
      );
    },
    [fileList],
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
        .uploadFile('cafes', file as File)
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

  return (
    <Section>
      <Box flexDirection="row" alignItems="center" mb="12px">
        <Typography.Title level={5}>이미지</Typography.Title>
      </Box>

      <Form.Item name="naverPhotos" hidden></Form.Item>
      <Form.Item name="images" required>
        <DndProvider backend={HTML5Backend}>
          <ImgCrop rotate>
            <ImageUpload
              listType="picture-card"
              fileList={fileList}
              onPreview={handleFilePreview}
              beforeUpload={handleFileUpload}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
              itemRender={(originNode, file, currFileList) => (
                <DragableUploadListItem
                  originNode={originNode}
                  file={file}
                  fileList={currFileList}
                  moveRow={moveRow}
                />
              )}
            >
              + Upload
            </ImageUpload>
          </ImgCrop>
        </DndProvider>
      </Form.Item>
    </Section>
  );
};

const ImageUpload = styled(Upload)`
  .ant-upload-select,
  .ant-upload-draggable-list-item {
    width: 162px !important;
    height: 114px !important;
  }
  .ant-upload-list-item-container {
    width: 162px !important;
    height: 122px !important;
  }
  .ant-upload-list-item-image {
    object-fit: cover !important;
  }
  .drop-over-upward,
  .drop-over-downward {
    border: 6px dashed rgb(var(--primary)) !important;
  }
`;

export default CafeImage;
