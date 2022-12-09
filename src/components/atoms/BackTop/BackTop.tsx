import styled from '@emotion/styled';
import { FloatButton } from 'antd';

const BackTop = styled(FloatButton.BackTop)`
  right: 48px;
  bottom: 48px;
  .ant-float-btn-body {
    background-color: rgb(var(--primary));
    svg {
      color: #ffffff;
    }
  }
`;

export default BackTop;
