import React from 'react';
import { Form, Input, Typography } from 'antd';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const CafeScrap = () => {
  return (
    <>
      <Section>
        <Box mb="12px">
          <Typography.Title level={5}>네이버맵 장소 프리셋</Typography.Title>
        </Box>

        <Box mb="8px">
          <Form.Item label="네이버맵 아이디" name="naverMapId">
            <Input placeholder="네이버맵 아이디" />
          </Form.Item>
        </Box>
      </Section>
    </>
  );
};

export default CafeScrap;
