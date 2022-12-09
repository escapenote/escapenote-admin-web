import styled from '@emotion/styled';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box } from 'components/atoms';

interface IProps {
  title: string;
  subTitle?: React.ReactNode | string;
  extra?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  onBack?: any;
}
const PageLoader: React.FC<IProps> = ({
  title,
  subTitle,
  extra,
  footer,
  onBack,
}) => (
  <Wrapper>
    <Container>
      <Box flexDirection="row" alignItems="center">
        {onBack && (
          <BackButton
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
          />
        )}
        <Title>{title}</Title>
        <Box ml="8px">{subTitle && subTitle}</Box>
      </Box>
      <Box flexDirection="row" gridGap="8px">
        {extra && extra}
      </Box>
    </Container>
    <Box>
      {footer && (
        <Box mt="12px" mb="-32px" mx="12px">
          {footer}
        </Box>
      )}
    </Box>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: rgba(var(--content));
  padding: 16px 24px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BackButton = styled(Button)`
  margin-right: 8px;
`;
const Title = styled.h1`
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default PageLoader;
