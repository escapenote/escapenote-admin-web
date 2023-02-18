import React from 'react';
import { Form, Input, Typography } from 'antd';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  currentTitles: string[];
  scrappedTitles: string[];
}
const ScrapperPreview: React.FC<IProps> = ({
  currentTitles,
  scrappedTitles,
}) => {
  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>미리보기</Typography.Title>
      </Box>

      <Form.Item
        label={
          <Box flexDirection="row" alignItems="center">
            <Box mr="4px">현재 데이터</Box>
            <Typography.Text type="danger">
              {currentTitles.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(currentTitles, null, 2)}
        />
      </Form.Item>
      <Form.Item
        label={
          <Box flexDirection="row" alignItems="center">
            <Box mr="4px">스크랩 데이터</Box>
            <Typography.Text type="danger">
              {scrappedTitles.length}
            </Typography.Text>
          </Box>
        }
      >
        <Input.TextArea
          style={{ minHeight: '245px' }}
          value={JSON.stringify(scrappedTitles, null, 2)}
        />
      </Form.Item>
    </Section>
  );
};

export default ScrapperPreview;
