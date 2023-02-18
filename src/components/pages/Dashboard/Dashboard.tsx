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
          <ul>
            <li>
              <a
                href="https://analytics.google.com/analytics/web/?authuser=3#/p345989485/reports/reportinghub?params=_u..nav%3Dmaui%26_u.dateOption%3Dlast28Days%26_u.comparisonOption%3Ddisabled"
                target="_blank"
                rel="noreferrer"
              >
                📈 Google Analytics
              </a>
            </li>
            <li>
              <a
                href="https://search.google.com/u/3/search-console?resource_id=sc-domain%3Aescape-note.com"
                target="_blank"
                rel="noreferrer"
              >
                🔍 Google Search Console
              </a>
            </li>
            <li>
              <a
                href="https://map.naver.com/v5/entry/place/1716448056"
                target="_blank"
                rel="noreferrer"
              >
                🗺 Find naver map place id
              </a>
            </li>
            <li>
              <a
                href="https://m.place.naver.com/place/1429097769/home"
                target="_blank"
                rel="noreferrer"
              >
                🏡 Naver place
              </a>
            </li>
          </ul>
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
