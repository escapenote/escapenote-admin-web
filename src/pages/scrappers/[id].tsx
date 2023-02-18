import { useQuery } from '@tanstack/react-query';
import api from 'api';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ScrapperDetail = dynamic(
  () => import('components/pages/ScrapperDetail'),
  {
    ssr: false,
  },
);

const ScrapperDetailPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data, refetch } = useQuery(['fetchScrapper', id], () =>
    api.scrappers.fetchScrapper({ id }),
  );

  return <ScrapperDetail id={id} scrapper={data} refetch={refetch} />;
};

export default ScrapperDetailPage;
