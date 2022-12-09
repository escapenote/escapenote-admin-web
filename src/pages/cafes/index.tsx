import dynamic from 'next/dynamic';

const CafeList = dynamic(() => import('components/pages/CafeList'), {
  ssr: false,
});

const CafeListPage = () => {
  return <CafeList />;
};

export default CafeListPage;
