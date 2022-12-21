import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Modal, Button, Row, Col, Form, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import {
  CheckCircleTwoTone,
  StopTwoTone,
  PauseCircleTwoTone,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { ITheme } from 'types';
import api from 'api';
import { IUpdateThemeBodyProps } from 'api/themes';
import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import ThemeRequiredInfo from './ThemeRequiredInfo';
import ThemeOptionalInfo from './ThemeOptionalInfo';

interface IProps {
  id: string;
  theme?: ITheme;
}
const ThemeDetail: React.FC<IProps> = ({ id, theme }) => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (theme) {
      form.setFieldsValue({
        ...theme,
        genre: theme.genre.map(v => v.id),
        images: theme.thumbnail ? [theme.thumbnail] : undefined,
        openDate: theme.openDate ? dayjs(theme.openDate) : undefined,
      });
    }
    return () => {
      handleValuesReset();
    };
  }, [theme]);

  const { mutate: updateMutate, isLoading: isSubmitting } = useMutation(
    (body: IUpdateThemeBodyProps) => api.themes.updateTheme({ id, body }),
    {
      onSuccess: () => {
        message.success('성공적으로 저장되었습니다.');
        return router.back();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    () => api.themes.deleteTheme({ id }),
    {
      onSuccess: () => {
        message.success('성공적으로 삭제되었습니다.');
        return router.back();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  function handleValuesReset() {
    form.setFieldsValue({
      cafeId: undefined,
      name: undefined,
      intro: undefined,
      thumbnail: undefined,
      genre: undefined,
      price: undefined,
      during: undefined,
      minPerson: undefined,
      maxPerson: undefined,
      level: undefined,
      lockingRatio: undefined,
      fear: undefined,
      openDate: undefined,
      detailUrl: undefined,
      reservationUrl: undefined,
      status: undefined,
    });
  }

  function handleSubmit(values: any) {
    if (!values.images) {
      message.warning('썸네일은 필수값입니다.');
      return;
    }
    if (!values.cafeId) {
      message.warning('카페는 필수값입니다.');
      return;
    }
    if (!values.name) {
      message.warning('이름은 필수값입니다.');
      return;
    }
    if (!values.intro) {
      message.warning('설명은 필수값입니다.');
      return;
    }
    if (!values.price) {
      message.warning('금액은 필수값입니다.');
      return;
    }
    if (!values.during) {
      message.warning('시간은 필수값입니다.');
      return;
    }
    if (!values.minPerson) {
      message.warning('최소 인원수는 필수값입니다.');
      return;
    }
    if (!values.maxPerson) {
      message.warning('최대 인원수는 필수값입니다.');
      return;
    }
    if (!values.level) {
      message.warning('난이도는 필수값입니다.');
      return;
    }

    if (values.openDate) {
      values.openDate = dayjs(values.openDate.$d).format('YYYY-MM-DD');
    } else {
      values.openDate = '';
    }

    const thumbnail = values.images.length > 0 ? values.images[0] : '';
    updateMutate({ ...values, thumbnail });
  }

  function handleDelete() {
    deleteMutate();
  }

  function handleShowModal() {
    setModalVisible(true);
  }
  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Box mx="-24px" mb="24px">
          <PageHeader
            title="테마 상세"
            subTitle={
              <>
                {theme?.status === 'PUBLISHED' ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : theme?.status === 'PROCESSING' ? (
                  <PauseCircleTwoTone twoToneColor="#FFC300" />
                ) : (
                  <StopTwoTone twoToneColor="#eb2f96" />
                )}
              </>
            }
            extra={[
              <Button
                key="save"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                저장
              </Button>,
              theme?.status !== 'DELETED' && (
                <Button
                  key="delete"
                  type="primary"
                  loading={isDeleting}
                  danger
                  onClick={handleShowModal}
                >
                  삭제
                </Button>
              ),
            ]}
            onBack={() => router.back()}
          />
        </Box>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <ThemeRequiredInfo form={form} theme={theme} />
          </Col>

          <Col span={16}>
            <ThemeOptionalInfo />
          </Col>
        </Row>
      </Form>

      {/* Modals */}
      <Modal
        title="테마 삭제"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={
          <Box flexDirection="row" justifyContent="flex-end">
            <Box mr="8px">
              <Button onClick={handleCloseModal}>취소</Button>
            </Box>
            <Button
              type="primary"
              danger
              loading={isDeleting}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Box>
        }
      >
        <Box flexDirection="row">
          <Typography.Text strong>&apos;{theme?.name}&apos;</Typography.Text>
          <Typography.Text>을/를 삭제하시겠습니까?</Typography.Text>
        </Box>
      </Modal>
    </>
  );
};

export default ThemeDetail;
