import React from 'react';
import { Col, Form, Input, InputNumber, Row, Typography } from 'antd';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const ThemeOptionalInfo = () => {
  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>추가 정보</Typography.Title>
      </Box>

      <Form.Item label="시간" name="during" required>
        <InputNumber min={0} />
      </Form.Item>
      <Box mb="16px">
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item label="최소 인원수" name="minPerson" required>
              <InputNumber style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="최대 인원수" name="maxPerson" required>
              <InputNumber style={{ width: '120px' }} />
            </Form.Item>
          </Col>
        </Row>
      </Box>
      <Form.Item label="난이도" name="level" required>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="상세 URL" name="detailUrl">
        <Input style={{ width: '400px' }} />
      </Form.Item>
      <Form.Item label="예약 URL" name="reservationUrl">
        <Input style={{ width: '400px' }} />
      </Form.Item>
    </Section>
  );
};

export default ThemeOptionalInfo;
