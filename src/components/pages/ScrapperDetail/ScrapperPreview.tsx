import React from 'react';
import { Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';

import { IMetric } from 'types';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  metric: IMetric;
}
const ScrapperPreview: React.FC<IProps> = ({ metric }) => {
  const createdAt =
    metric?.createdAt && dayjs(metric.createdAt).format('YYYY-MM-DD HH:mm');

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
              {metric?.currentThemes.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(metric?.currentThemes, null, 2)}
        />
      </Form.Item>
      <Form.Item
        label={
          <Box flexDirection="row" alignItems="center">
            <Box mr="4px">스크랩 데이터</Box>
            <Typography.Text type="danger">
              {metric?.scrappedThemes.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(metric?.scrappedThemes, null, 2)}
        />
      </Form.Item>
    </Section>
  );
};

export default ScrapperPreview;
