import React from 'react';
import { Form, Input, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  metricId: string;
}
const ScrapperPreview: React.FC<IProps> = ({ metricId }) => {
  const { data } = useQuery(['fetchMetric', metricId], () =>
    api.metrics.fetchMetric({ id: metricId }),
  );

  const createdAt =
    data?.createdAt && dayjs(data.createdAt).format('YYYY-MM-DD HH:mm');

  return (
    <Section>
      <Box flexDirection="row" mb="12px">
        <Typography.Title level={5}>미리보기</Typography.Title>
        <Box width="10px" />
        <Typography.Text type="secondary">
          (스크랩 날짜: {createdAt})
        </Typography.Text>
      </Box>

      <Form.Item
        label={
          <Box flexDirection="row" alignItems="center">
            <Box mr="4px">현재 데이터</Box>
            <Typography.Text type="danger">
              {data?.currentThemes.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(data?.currentThemes, null, 2)}
        />
      </Form.Item>
      <Form.Item
        label={
          <Box flexDirection="row" alignItems="center">
            <Box mr="4px">스크랩 데이터</Box>
            <Typography.Text type="danger">
              {data?.scrappedThemes.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(data?.scrappedThemes, null, 2)}
        />
      </Form.Item>
    </Section>
  );
};

export default ScrapperPreview;
