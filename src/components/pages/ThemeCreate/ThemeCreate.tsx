import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Row, Col, Form, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

import api from 'api';
import { ICreateThemeBodyProps } from 'api/themes';
import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import ThemeRequiredInfo from './ThemeRequiredInfo';
import ThemeOptionalInfo from './ThemeOptionalInfo';

const ThemeCreate = () => {
  const router = useRouter();
  const cafeId = String(router.query.cafeId ?? '');

  const [form] = Form.useForm();

  useEffect(() => {
    if (cafeId) {
      form.setFieldValue('cafeId', cafeId);
    }
  }, [cafeId]);

  const { mutate, isLoading: isSubmitting } = useMutation(
    (body: ICreateThemeBodyProps) => api.themes.createTheme({ body }),
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
    if (!values.genre || values.genre.length === 0) {
      message.warning('장르는 필수값입니다.');
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
    mutate({ ...values, thumbnail });
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Box mx="-24px" mb="24px">
        <PageHeader
          title="테마 추가"
          extra={[
            <Button
              key="save"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              추가
            </Button>,
          ]}
          onBack={() => router.back()}
        />
      </Box>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ThemeRequiredInfo form={form} />
        </Col>

        <Col span={16}>
          <ThemeOptionalInfo />
        </Col>
      </Row>
    </Form>
  );
};

export default ThemeCreate;
