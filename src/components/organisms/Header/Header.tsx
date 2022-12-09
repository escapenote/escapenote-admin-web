import React from 'react';
import Auth from '@aws-amplify/auth';
import styled from '@emotion/styled';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';

import { useAppDispatch, useAppSelector } from 'store';
import { setIsFolded } from 'store/commonSlice';
import { setAuth } from 'store/authSlice';
import { Box } from 'components/atoms';

interface IProps {
  broken: boolean;
}
const Header: React.FC<IProps> = ({ broken }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const collapsed = useAppSelector(state => state.common.isFolded);

  async function handleLogOut() {
    try {
      await Auth.signOut();
      dispatch(setAuth(null));
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  function handleSetCollapsed(collapsed: boolean) {
    dispatch(setIsFolded(collapsed));
  }

  return (
    <Layout.Header className="header">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height="48px"
      >
        <Box flexDirection="row" alignItems="center">
          {broken && (
            <Trigger>
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ color: 'white' }}
                  onClick={() => handleSetCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ color: 'white' }}
                  onClick={() => handleSetCollapsed(!collapsed)}
                />
              )}
            </Trigger>
          )}
          {!broken && <Title>ESCAPE NOTE</Title>}
        </Box>

        <Box flexDirection="row" alignItems="center">
          <Box position="relative">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <a onClick={handleLogOut}>로그아웃</a>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <User>
                <Box mr="8px">
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    icon={<UserOutlined />}
                  />
                </Box>
              </User>
            </Dropdown>
          </Box>
        </Box>
      </Box>
    </Layout.Header>
  );
};

const Title = styled.h1`
  margin: 4px 8px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
const Trigger = styled.button`
  margin-top: 2px;
  margin-left: 16px;
  font-size: 20px;
  cursor: pointer;
`;
const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export default Header;
