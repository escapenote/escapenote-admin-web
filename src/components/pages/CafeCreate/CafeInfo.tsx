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

      <Form.Item label="지역 대분류" name="areaA" required>
        <Select style={{ width: '140px' }}>
          <Select.Option value="서울">서울</Select.Option>
          {/* <Select.Option value="부산">부산</Select.Option>
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
          <Select.Option value="제주">제주</Select.Option> */}
        </Select>
      </Form.Item>
      <Form.Item label="지역 소분류" name="areaB" required>
        <Select style={{ width: '140px' }}>
          <Select.Option value="강남">강남</Select.Option>
          <Select.Option value="건대">건대</Select.Option>
          <Select.Option value="김포">김포</Select.Option>
          <Select.Option value="노량진">노량진</Select.Option>
          <Select.Option value="노원">노원</Select.Option>
          <Select.Option value="대학로">대학로</Select.Option>
          <Select.Option value="명동">명동</Select.Option>
          <Select.Option value="서울대입구">서울대입구</Select.Option>
          <Select.Option value="성신여대">성신여대</Select.Option>
          <Select.Option value="신림">신림</Select.Option>
          <Select.Option value="신사">신사</Select.Option>
          <Select.Option value="신촌">신촌</Select.Option>
          <Select.Option value="영등포">영등포</Select.Option>
          <Select.Option value="왕십리">왕십리</Select.Option>
          <Select.Option value="이수">이수</Select.Option>
          <Select.Option value="잠실">잠실</Select.Option>
          <Select.Option value="종각">종각</Select.Option>
          <Select.Option value="홍대">홍대</Select.Option>
        </Select>
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
