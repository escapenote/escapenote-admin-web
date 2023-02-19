import React, { useState } from 'react';
import { Button, Form, FormInstance, Input, Select, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  form: FormInstance<any>;
  cafeId?: string;
  onScrap: () => Promise<void>;
}
const ScrapperInfo: React.FC<IProps> = ({ form, cafeId, onScrap }) => {
  const [isScrapping, setIsScrapping] = useState(false);

  const { data: cafeList } = useQuery(
    ['fetchCafes', 'isNotScrapper', cafeId],
    () =>
      api.cafes.fetchCafes({
        isNotScrapper: true,
        cafeId,
        page: 1,
        limit: 1000,
        sort: 'name',
        order: 'asc',
      }),
  );

  function handleCafeChange(id: string) {
    form.setFieldValue('cafeId', id);
  }

  async function handleScrap() {
    setIsScrapping(true);
    await onScrap();
    setIsScrapping(false);
  }

  return (
    <Section>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="12px"
      >
        <Typography.Title level={5}>필수 정보</Typography.Title>
        <Button key="scrap" danger loading={isScrapping} onClick={handleScrap}>
          스크랩
        </Button>
      </Box>

      <Form.Item name="status" required hidden>
        <Input />
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
      <Form.Item label="URL" name="url" required>
        <Input />
      </Form.Item>
      <Form.Item label="테마 셀렉터" name="themeSelector" required>
        <Input />
      </Form.Item>
      <Form.Item label="그룹 셀렉터" name="groupSelector">
        <Input />
      </Form.Item>
      <Form.Item label="지점 셀렉터" name="branchSelector">
        <Input />
      </Form.Item>
      <Form.Item label="주석" name="comment">
        <Input.TextArea rows={6} />
      </Form.Item>
    </Section>
  );
};

export default ScrapperInfo;
