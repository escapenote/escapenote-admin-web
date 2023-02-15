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
  const areaA = Form.useWatch('areaA', form);
  const areaAData = Object.keys(location);
  const areaBData = areaA ? location[areaA] : [];

  const addressLine = Form.useWatch('addressLine', form);
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
                    {areaAData?.map(v => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
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
              <Form.Item label="위도" name="lat" required>
                <InputNumber style={{ width: '120px' }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="경도" name="lng" required>
                <InputNumber style={{ width: '120px' }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col flex="1">
          <SimpleMap addressLine={addressLine} lat={lat} lng={lng} />
        </Col>
      </Row>
    </Section>
  );
};

export default SpaceLocation;
