import React, { useState } from 'react';
import Auth from '@aws-amplify/auth';
import styled from '@emotion/styled';
import { message, Input, Button, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useAppDispatch } from 'store';
import { setAuth } from 'store/authSlice';
import { Box } from 'components/atoms';

const Login = () => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else setPassword(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.completeNewPassword(user, password);
        const signedUser = await Auth.currentAuthenticatedUser();
        dispatch(setAuth(signedUser.attributes));
        message.success('성공적으로 로그인 하였습니다.');
        setIsSubmitting(false);
      } else {
        dispatch(setAuth(user.attributes));
        message.success('성공적으로 로그인 하였습니다.');
        setIsSubmitting(false);
      }
    } catch (error) {
      message.error('로그인에 실패하였습니다.');
      setIsSubmitting(false);
    }
  }

  return (
    <Wrapper>
      <Container onSubmit={handleSubmit}>
        <Box mb="12px">
          <Typography.Title level={3}>ESCAPE NOTE</Typography.Title>
        </Box>

        <Box mb="16px">
          <Input
            prefix={<UserOutlined style={{ color: 'gray' }} />}
            name="username"
            placeholder="이메일"
            onChange={handleChangeValue}
          />
        </Box>
        <Box mb="20px">
          <Input
            prefix={<LockOutlined style={{ color: 'gray' }} />}
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChangeValue}
          />
        </Box>

        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={!username || !password}
        >
          로그인
        </Button>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  padding: 40px 20px;
  width: 100%;
  max-width: 360px;
  background-color: rgb(var(--content));
  text-align: center;
`;

export default Login;
