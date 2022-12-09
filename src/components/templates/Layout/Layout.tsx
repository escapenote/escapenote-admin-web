import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'antd';

import { BackTop } from 'components/atoms';
import Header from 'components/organisms/Header';
import Sidebar from 'components/organisms/Sidebar';
import Footer from 'components/organisms/Footer';

const { Content } = Layout;

interface IProps {
  children?: React.ReactNode;
}
const StyledLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();

  const [broken, setBroken] = useState(false);

  const isHideFooter =
    ['/articles/create', '/articles/[id]'].indexOf(router.pathname) > -1;

  function handleSetBroken(broken: boolean) {
    setBroken(broken);
  }

  return (
    <Layout style={{ minHeight: 'auto' }} hasSider>
      <Header broken={broken} />

      <Sidebar broken={broken} onSetBroken={handleSetBroken} />

      <Layout>
        <Content className="content">{children}</Content>

        {!isHideFooter && <Footer />}
      </Layout>

      <BackTop />
    </Layout>
  );
};

export default StyledLayout;
