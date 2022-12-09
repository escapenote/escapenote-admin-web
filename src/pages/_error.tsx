import React from 'react';
import { NextPageContext } from 'next';

import NotFoundPage from './404';
import ErrorPage from './500';

interface IErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: IErrorProps) => {
  if (statusCode === 404) {
    return <NotFoundPage />;
  }
  return <ErrorPage />;
};

Error.getInitialProps = ({ err }: NextPageContext) => {
  const statusCode = err ? err.statusCode : 500;
  return { statusCode };
};

export default Error;
