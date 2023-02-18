import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const ThemeOptionalInfo = () => {
  const { data: genreList } = useQuery(['fetchGenreList'], () =>
    api.genre.fetchGenreList({ page: 1, limit: 1000 }),
  );

  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>추가 정보</Typography.Title>
      </Box>

      <Form.Item label="장르" name="genre">
        <Select
          style={{ width: '400px' }}
          showSearch
          allowClear
          mode="multiple"
          placeholder="장르를 선택해주세요"
          optionFilterProp="label"
        >
          {genreList?.items.map(item => (
            <Select.Option key={item.id} label={item.id} value={item.id}>
              {item.id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="금액" name="price" required>
        <InputNumber
          style={{ width: '200px' }}
          min={0}
          addonAfter="원"
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      </Form.Item>
      <Form.Item label="시간" name="during" required>
        <InputNumber style={{ width: '100px' }} min={0} addonAfter="분" />
      </Form.Item>
      <Box mb="16px">
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item label="최소 인원수" name="minPerson" required>
              <InputNumber style={{ width: '100px' }} addonAfter="명" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="최대 인원수" name="maxPerson" required>
              <InputNumber style={{ width: '100px' }} addonAfter="명" />
            </Form.Item>
          </Col>
        </Row>
      </Box>
      <Box mb="16px">
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item label="난이도" name="level" required>
              <InputNumber style={{ width: '100px' }} min={0} max={5} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="자물쇠 장치 비율" name="lockingRatio">
              <InputNumber
                style={{ width: '100px' }}
                min={0}
                max={100}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
        </Row>
      </Box>
      <Form.Item label="공포도" name="fear">
        <InputNumber style={{ width: '100px' }} min={0} max={5} />
      </Form.Item>
      <Form.Item label="활동성" name="activity">
        <InputNumber style={{ width: '100px' }} min={0} max={5} />
      </Form.Item>
      <Form.Item label="오픈일" name="openDate">
        <DatePicker picker="date" placeholder="" />
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
