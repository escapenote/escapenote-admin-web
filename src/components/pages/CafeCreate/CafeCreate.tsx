import React from 'react';
import { useRouter } from 'next/router';
import { Button, Row, Col, Form, message } from 'antd';
import { useMutation } from '@tanstack/react-query';

import api from 'api';
import { ICreateCafeBodyProps } from 'api/cafes';
import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import CafeScrap from './CafeScrap';
import CafeInfo from './CafeInfo';
import CafeLocation from './CafeLocation';
import CafeImage from './CafeImage';

const CafeDetail = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const { mutate, isLoading: isSubmitting } = useMutation(
    (body: ICreateCafeBodyProps) => api.cafes.createCafe({ body }),
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
    if (!values.areaA) {
      message.warning('지역 대분류는 필수값입니다.');
      return;
    }
    if (!values.areaB) {
      message.warning('지역 소분류는 필수값입니다.');
      return;
    }
    if (!values.name) {
      message.warning('이름은 필수값입니다.');
      return;
    }
    if (!values.addressLine) {
      message.warning('주소는 필수값입니다.');
      return;
    }

    mutate(values);
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Box mx="-24px" mb="24px">
        <PageHeader
          title="카페 추가"
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
          <CafeScrap form={form} />
          <CafeInfo />
        </Col>

        <Col span={16}>
          <CafeImage form={form} />
          <CafeLocation form={form} />
        </Col>
      </Row>
    </Form>
  );
};

export default CafeDetail;
