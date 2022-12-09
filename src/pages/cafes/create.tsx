import dynamic from 'next/dynamic';

const CafeCreate = dynamic(() => import('components/pages/CafeCreate'), {
  ssr: false,
});

const CafeCreatePage = () => {
  return <CafeCreate />;
};

export default CafeCreatePage;
