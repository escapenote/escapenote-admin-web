import dynamic from 'next/dynamic';

const ThemeList = dynamic(() => import('components/pages/ThemeList'), {
  ssr: false,
});

const ThemeListPage = () => {
  return <ThemeList />;
};

export default ThemeListPage;
