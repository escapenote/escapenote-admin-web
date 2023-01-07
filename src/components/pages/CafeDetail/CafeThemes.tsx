import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Card, Tag, Row, Col } from 'antd';
import {
  ClockCircleTwoTone,
  LockTwoTone,
  CheckCircleTwoTone,
  StopTwoTone,
} from '@ant-design/icons';

import api from 'api';
import { Box } from 'components/atoms';

interface IProps {
  id: string;
}
const CafeThemes: React.FC<IProps> = ({ id }) => {
  const router = useRouter();

  const { data } = useQuery(['fetchThemes', id], () =>
    api.themes.fetchThemes({
      cafeId: id,
      status,
      page: 1,
      limit: 100,
    }),
  );

  function handleClickTheme(themeId: string) {
    router.push(`/themes/${themeId}`);
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.items.map(item => (
        <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
          <Card
            hoverable
            cover={
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.thumbnail}`}
                alt={item.name}
                height="280px"
              />
            }
            onClick={() => handleClickTheme(item.id)}
          >
            <Box height="160px">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb="12px"
              >
                {item.genre.length > 0 ? (
                  <Tag color="orange">
                    장르: {item.genre.map(v => v.id).join(', ')}
                  </Tag>
                ) : (
                  <Tag>장르: 미지정</Tag>
                )}
                {item.status === 'PUBLISHED' ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <StopTwoTone twoToneColor="#eb2f96" />
                )}
              </Box>
              <Card.Meta
                title={item.name}
                description={<Desc>{item.intro}</Desc>}
              />
              <Box flexDirection="row" mt="auto">
                <Box display="inline" mr="16px">
                  <ClockCircleTwoTone twoToneColor="skyblue" /> {item.during}
                </Box>
                <Box display="inline">
                  <LockTwoTone twoToneColor="orange" /> {item.level}
                </Box>
              </Box>
            </Box>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const Desc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default CafeThemes;
