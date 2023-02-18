import { useRouter } from 'next/router';
import {
  AppstoreOutlined,
  ShopOutlined,
  HighlightOutlined,
  TagsOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { useAppDispatch, useAppSelector } from 'store';
import { setIsFolded } from 'store/commonSlice';

const { Sider } = Layout;

interface IProps {
  broken: boolean;
  onSetBroken: (broken: boolean) => void;
}
const Sidebar: React.FC<IProps> = ({ broken, onSetBroken }) => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(state => state.common.isFolded);

  const router = useRouter();
  const pathname = router.pathname;
  const regex = /^[a-zA-Z0-9]+/;

  const from =
    pathname === '/'
      ? 'dashboard'
      : pathname
          .split('/')
          .filter(v => regex.test(v))
          .join('/');

  function handleSetCollapsed(collapsed: boolean) {
    dispatch(setIsFolded(collapsed));
  }

  const selectedKeys = [from];
  const openKeys = [`open-${from.split('/')[0]}`];

  return (
    <Sider
      className="sider"
      theme="light"
      collapsible
      collapsed={collapsed}
      collapsedWidth={broken ? 0 : 80}
      breakpoint="md"
      onCollapse={handleSetCollapsed}
      onBreakpoint={broken => onSetBroken(broken)}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={[
          {
            key: 'dashboard',
            label: '대시보드',
            icon: <AppstoreOutlined />,
            onClick: () => router.push('/'),
          },
          {
            key: 'cafes',
            label: '카페',
            icon: <ShopOutlined />,
            onClick: () => router.push('/cafes'),
          },
          {
            key: 'themes',
            label: '테마',
            icon: <HighlightOutlined />,
            onClick: () => router.push('/themes'),
          },
          {
            key: 'genre',
            label: '장르',
            icon: <TagsOutlined />,
            onClick: () => router.push('/genre'),
          },
          {
            key: 'monitoring',
            label: '모니터링',
            icon: <RobotOutlined />,
            onClick: () => router.push('/monitoring/metrics'),
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
