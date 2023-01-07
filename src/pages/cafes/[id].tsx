import { useQuery } from '@tanstack/react-query';
import api from 'api';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const CafeDetail = dynamic(() => import('components/pages/CafeDetail'), {
  ssr: false,
});

const CafeDetailPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data, refetch } = useQuery(['fetchCafe', id], () =>
    api.cafes.fetchCafe({ id }),
  );

  return <CafeDetail id={id} cafe={data} refetch={refetch} />;
};

export default CafeDetailPage;
