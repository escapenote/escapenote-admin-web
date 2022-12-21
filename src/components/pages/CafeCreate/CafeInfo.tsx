import React from 'react';
import { Form, Input, InputNumber, Select, Typography } from 'antd';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const CafeInfo = () => {
  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>상세 정보</Typography.Title>
      </Box>

      <Form.Item label="이름" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="소개" name="intro">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item label="웹사이트" name="website">
        <Input />
      </Form.Item>
      <Form.Item label="전화번호" name="tel">
        <Input />
      </Form.Item>
      <Form.Item label="영업 시간" name="openingHours">
        <Input.TextArea
          rows={4}
          defaultValue='[{"day":"월","openTime":"","closeTime":""},{"day":"화","openTime":"","closeTime":""},{"day":"수","openTime":"","closeTime":""},{"day":"목","openTime":"","closeTime":""},{"day":"금","openTime":"","closeTime":""},{"day":"토","openTime":"","closeTime":""},{"day":"일","openTime":"","closeTime":""}]'
        />
      </Form.Item>
    </Section>
  );
};

export default CafeInfo;
