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

import Section from 'components/templates/Section';
import SimpleMap from 'components/maps/SimpleMap';
import { Box } from 'components/atoms';

interface IProps {
  form: FormInstance<any>;
}
const SpaceLocation: React.FC<IProps> = ({ form }) => {
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
          <SimpleMap
            addressLine={addressLine}
            lat={lat}
            lng={lng}
          />
        </Col>
      </Row>
    </Section>
  );
};

export default SpaceLocation;
