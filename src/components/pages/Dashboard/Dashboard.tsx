import React from 'react';
import styled from '@emotion/styled';

import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const Dashboard = () => {
  return (
    <Box mt="24px">
      <Section>
        <Box mb="20px">
          <Title>Welcome to Escape Note</Title>
        </Box>
        <Box>
          ...
        </Box>
      </Section>
    </Box>
  );
};

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export default Dashboard;
