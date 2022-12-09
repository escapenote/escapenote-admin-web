import { Result } from 'antd';

import HeadPageMeta from 'components/templates/HeadPageMeta';
import { Box } from 'components/atoms';

/**
 * 404 페이지
 */
const NotFoundPage = () => {
  return (
    <>
      <HeadPageMeta
        title="페이지를 찾을 수 없습니다."
        description="잘못 된 주소를 입력했거나, 찾으시는 페이지가 삭제되었을 수 있습니다."
        pageUrl={`${process.env.NEXT_PUBLIC_ADMIN_URL}/404`}
      />

      <Box mt="24px" center>
        <Result
          status="404"
          title="404"
          subTitle="페이지를 찾을 수 없습니다."
        />
      </Box>
    </>
  );
};

export default NotFoundPage;
