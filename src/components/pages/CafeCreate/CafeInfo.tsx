import React from 'react';
import { DatePicker, Form, Input, InputNumber, Select, Typography } from 'antd';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const CafeInfo = () => {
  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>상세 정보</Typography.Title>
      </Box>

      <Form.Item label="지역 대분류" name="areaA" required>
        <Select style={{ width: '140px' }}>
          <Select.Option value="서울">서울</Select.Option>
          <Select.Option value="부산">부산</Select.Option>
          <Select.Option value="대구">대구</Select.Option>
          <Select.Option value="인천">인천</Select.Option>
          <Select.Option value="광주">광주</Select.Option>
          <Select.Option value="대전">대전</Select.Option>
          <Select.Option value="울산">울산</Select.Option>
          <Select.Option value="세종">세종</Select.Option>
          <Select.Option value="경기">경기</Select.Option>
          <Select.Option value="강원">강원</Select.Option>
          <Select.Option value="충북">충북</Select.Option>
          <Select.Option value="충남">충남</Select.Option>
          <Select.Option value="전북">전북</Select.Option>
          <Select.Option value="전남">전남</Select.Option>
          <Select.Option value="경북">경북</Select.Option>
          <Select.Option value="경남">경남</Select.Option>
          <Select.Option value="제주">제주</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="지역 소분류" name="areaB" required>
        <Input />
      </Form.Item>
      <Form.Item label="이름" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="웹사이트" name="website">
        <Input />
      </Form.Item>
      <Form.Item label="전화번호" name="tel">
        <Input />
      </Form.Item>
      <Form.Item label="오픈 시간" name="openingHour">
        <InputNumber
          style={{ width: '120px' }}
          min={0}
          max={24}
          addonAfter="시간"
        />
      </Form.Item>
      <Form.Item label="클로즈 시간" name="closingHour">
        <InputNumber
          style={{ width: '120px' }}
          min={0}
          max={24}
          addonAfter="시간"
        />
      </Form.Item>
    </Section>
  );
};

export default CafeInfo;
