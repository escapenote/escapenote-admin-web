import { Result } from 'antd';

import HeadPageMeta from 'components/templates/HeadPageMeta';
import { Box } from 'components/atoms';

/**
 * 에러 페이지
 */
const ErrorPage = () => {
  return (
    <>
      <HeadPageMeta
        title="에러가 발생했습니다."
        description="잠시 후에 다시 시도해 주시거나, 계속해서 이 화면이 나온다면 저희에게 알려주세요."
        pageUrl={`${process.env.NEXT_PUBLIC_ADMIN_URL}/500`}
      />

      <Box mt="24px" center>
        <Result status="500" title="500" subTitle="에러가 발생했습니다." />
      </Box>
    </>
  );
};

export default ErrorPage;
