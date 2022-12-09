import { useRouter } from 'next/router';
import { Result, Button } from 'antd';

import { Box } from 'components/atoms';

const NotAuthorized = () => {
  const router = useRouter();

  return (
    <Box center>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Back Home
          </Button>
        }
      />
    </Box>
  );
};

export default NotAuthorized;
