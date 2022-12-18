import dynamic from 'next/dynamic';

const GenreList = dynamic(() => import('components/pages/GenreList'), {
  ssr: false,
});

const GenreListPage = () => {
  return <GenreList />;
};

export default GenreListPage;
