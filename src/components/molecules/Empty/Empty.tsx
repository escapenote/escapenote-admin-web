import { Empty as AntdEmpty } from 'antd';

import { Box } from 'components/atoms';

const Empty = () => (
  <Box p="12px" center>
    <AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} />
  </Box>
);

export default Empty;
