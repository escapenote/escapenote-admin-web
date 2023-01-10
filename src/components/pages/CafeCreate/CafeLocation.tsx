import {
  Form,
  InputNumber,
  Input,
  Typography,
  Row,
  Col,
  FormInstance,
  Select,
} from 'antd';

import { useAppSelector } from 'store';
import Section from 'components/templates/Section';
import SimpleMap from 'components/maps/SimpleMap';
import { Box } from 'components/atoms';

interface IProps {
  form: FormInstance<any>;
}
const SpaceLocation: React.FC<IProps> = ({ form }) => {
  const location = useAppSelector(state => state.data.location);
  const areaAData = '서울';
  const areaBData = location[areaAData];

  const lat = Form.useWatch('lat', form);
  const lng = Form.useWatch('lng', form);

  return (
    <Section>
      <Box mb="12px">
        <Typography.Title level={5}>위치</Typography.Title>
      </Box>

      <Row gutter={[16, 16]}>
        <Col flex="1">
          <Box mb="16px">
            <Row gutter={[16, 16]}>
              <Col>
                <Form.Item label="지역 대분류" name="areaA" required>
                  <Select style={{ width: '140px' }}>
                    <Select.Option value="서울">서울</Select.Option>
                    {/* <Select.Option value="부산">부산</Select.Option>
                      <Select.Option value="대구">대구</Select.Option>
                      <Select.Option value="인천">인천</Select.Option>
                      <Select.Option value="광주">광주</Select.Option>
                      <Select.Option value="대전">대전</Select.Option>
                      <Select.Option value="울산">울산</Select.Option>
                      <Select.Option value="세종">세종</Select.Option>
                      <Select.Option value="경기">경기</Select.Option>
                      <Select.Option value="강원">강원</Select.Option>
                      <Select.Option value="충북">충북</Select.Option>
                      <Select.Option value="충남">충남</Select.Option>
                      <Select.Option value="전북">전북</Select.Option>
                      <Select.Option value="전남">전남</Select.Option>
                      <Select.Option value="경북">경북</Select.Option>
                      <Select.Option value="경남">경남</Select.Option>
                      <Select.Option value="제주">제주</Select.Option> */}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="지역 소분류" name="areaB" required>
                  <Select style={{ width: '140px' }}>
                    {areaBData?.map(v => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Box>
          <Form.Item label="주소" name="addressLine" required>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item label="위도" name="lat">
                <InputNumber style={{ width: '120px' }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="경도" name="lng">
                <InputNumber style={{ width: '120px' }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col flex="1">
          <SimpleMap lat={lat} lng={lng} />
        </Col>
      </Row>
    </Section>
  );
};

export default SpaceLocation;
