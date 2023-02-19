import dynamic from 'next/dynamic';

const Monitoring = dynamic(() => import('components/pages/Monitoring'), {
  ssr: false,
});

const MonitoringPage = () => {
  return <Monitoring tab="metrics" />;
};

export default MonitoringPage;