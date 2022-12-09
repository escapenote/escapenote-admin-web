import { Spin } from 'antd';

import { Box } from 'components/atoms';

const PageLoader = () => (
  <Box p="12px" center>
    <Box m="32px 0">
      <Spin />
    </Box>
  </Box>
);

export default PageLoader;
