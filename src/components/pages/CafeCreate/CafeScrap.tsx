import React, { useState } from 'react';
import { Button, Form, FormInstance, Input, message, Typography } from 'antd';

import api from 'api';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

interface IProps {
  form: FormInstance<any>;
}
const CafeScrap: React.FC<IProps> = ({ form }) => {
  const [isFinding, setIsFinding] = useState(false);
  const [naverMapId, setPlaceId] = useState('');

  async function handleCallData() {
    setIsFinding(true);
    try {
      if (!naverMapId) {
        message.error('장소 아이디는 필수 값입니다.');
        setIsFinding(false);
        return;
      }

      const space = await api.cafes.fetchCafeByMapId(naverMapId);
      if (space) {
        message.error('이미 추가된 카페입니다.');
        setIsFinding(false);
        return;
      }

      const result = await api.cafes.fetchMapDetail(naverMapId);
      if (!result) {
        message.error('해당 장소를 찾을 수 없습니다.');
        setIsFinding(false);
        return;
      }

      form.setFieldValue('name', result.name);
      form.setFieldValue('intro', result.intro);
      form.setFieldValue('website', result.website);
      form.setFieldValue('tel', result.tel);
      if (result.openingHours) {
        form.setFieldValue('openingHours', JSON.stringify(result.openingHours));
      }
      if (result.images) {
        const images = result.images.slice(0, 10);
        form.setFieldValue('naverPhotos', images);
      }
      form.setFieldValue('areaA', result.areaA);
      form.setFieldValue('addressLine', result.addressLine);
      form.setFieldValue('lat', result.lat);
      form.setFieldValue('lng', result.lng);
      setIsFinding(false);
    } catch (e: any) {
      message.error('프리셋 데이터 조회 에러');
      setIsFinding(false);
    }
  }

  return (
    <>
      <Section>
        <Box mb="12px">
          <Typography.Title level={5}>네이버맵 장소 프리셋</Typography.Title>
        </Box>

        <Box mb="8px">
          <Form.Item name="naverMapId">
            <Box flexDirection="row" gridGap="8px">
              <Input
                placeholder="네이버맵 아이디"
                value={naverMapId}
                onChange={e => setPlaceId(e.target.value)}
              />
              <Button
                type="primary"
                loading={isFinding}
                onClick={handleCallData}
              >
                연동
              </Button>
            </Box>
          </Form.Item>
        </Box>
      </Section>
    </>
  );
};

export default CafeScrap;
