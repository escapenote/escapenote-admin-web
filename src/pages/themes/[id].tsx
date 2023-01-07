import { useQuery } from '@tanstack/react-query';
import api from 'api';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ThemeDetail = dynamic(() => import('components/pages/ThemeDetail'), {
  ssr: false,
});

const ThemeDetailPage = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data, refetch } = useQuery(['fetchTheme', id], () =>
    api.themes.fetchTheme({ id }),
  );

  return <ThemeDetail id={id} theme={data} refetch={refetch} />;
};

export default ThemeDetailPage;
