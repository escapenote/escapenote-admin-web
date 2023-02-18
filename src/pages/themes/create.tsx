import dynamic from 'next/dynamic';

const ThemeCreate = dynamic(() => import('components/pages/ThemeCreate'), {
  ssr: false,
});

const ThemeCreatePage = () => {
  return <ThemeCreate />;
};

export default ThemeCreatePage;
