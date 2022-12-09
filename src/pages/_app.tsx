import React, { useRef } from 'react';
import App, { AppProps } from 'next/app';
import Amplify, { withSSRContext } from 'aws-amplify';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { Global } from '@emotion/react';
import { ConfigProvider } from 'antd';

import awsExports from 'aws-exports';
import globalStyles from 'styles/globalStyles';
import { primaryColor } from 'styles/variables';
import { useAppSelector, wrapper } from 'store';
import { setAuth } from 'store/authSlice';
import Layout from 'components/templates/Layout';
import HeadDefaultMeta from 'components/templates/HeadDefaultMeta';
import Login from 'components/pages/Login';

Amplify.configure({ ...awsExports, ssr: true });

function MyAuth({ children }: any) {
  const user = useAppSelector(state => state.auth.user);
  return user ? children : <Login />;
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const themeColor = `rgb(${primaryColor})`;

  return (
    <>
      <HeadDefaultMeta />

      <Global styles={globalStyles} />

      <ConfigProvider
        theme={{
          token: { colorPrimary: themeColor, colorLinkHover: themeColor },
        }}
      >
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={(pageProps as any).dehydratedState}>
            <MyAuth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MyAuth>
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  store => async appContext => {
    const { req } = appContext.ctx;

    if (req) {
      const { Auth } = withSSRContext({ req });
      let user;
      try {
        user = await Auth.currentSession();
        if (user) {
          store.dispatch(setAuth(user.idToken.payload));
        }
      } catch (e) {
        if (user) {
          store.dispatch(setAuth(user.idToken.payload));
        } else {
          console.log(e);
        }
      }
    }

    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  },
);

export default wrapper.withRedux(MyApp);
