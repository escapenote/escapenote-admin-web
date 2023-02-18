import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';

import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import MonitoringMetrics from './MonitoringMetrics';
import MonitoringScrappers from './MonitoringScrappers';

interface IProps {
  tab: string;
}
const Monitoring: React.FC<IProps> = ({ tab }) => {
  const router = useRouter();

  function handleChangeTab(activeTab: string) {
    router.replace(`/monitoring/${activeTab}`);
  }

  return (
    <>
      <Box mx="-24px" mb="24px">
        <PageHeader
          title="모니터링"
          footer={
            <Tabs activeKey={tab} onChange={handleChangeTab}>
              <Tabs.TabPane key="metrics" tab="테마 현황" />
              <Tabs.TabPane key="scrappers" tab="카페별 테마 수집 관리" />
            </Tabs>
          }
        />
      </Box>

      {tab === 'metrics' && <MonitoringMetrics />}
      {tab === 'scrappers' && <MonitoringScrappers />}
    </>
  );
};

export default Monitoring;
