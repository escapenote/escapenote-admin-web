import React, { useEffect, useState } from 'react';
import { Row, Col, Form, message } from 'antd';

import { IScrapper } from 'types';
import api from 'api';
import CafeScrapperInfo from './CafeScrapperInfo';
import CafeScrapperPreview from './CafeScrapperPreview';

interface IProps {
  id: string;
  scrapper?: IScrapper;
}
const CafeScrapper: React.FC<IProps> = ({ id, scrapper }) => {
  console.log('scrapper', scrapper);
  const [form] = Form.useForm();
  const cafeId = Form.useWatch('cafeId', form);
  const themeSelector = Form.useWatch('themeSelector', form);

  const [currentTitles, setCurrentTitles] = useState<string[]>([]);
  const [scrappedTitles, setScrappedTitles] = useState<string[]>([]);

  useEffect(() => {
    if (scrapper) {
      form.setFieldsValue(scrapper);
    }
  }, [scrapper]);

  async function handleScrap() {
    if (cafeId) {
      const data = await api.scrappers.fetchScrapperTryScrap({
        id,
        cafeId,
        themeSelector,
      });
      setCurrentTitles(data.currentTitles.sort());
      setScrappedTitles(data.scrappedTitles.sort());
    } else {
      message.warning('카페 체크 후 사용해주세요.');
    }
  }

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <CafeScrapperInfo form={form} onScrap={handleScrap} />
        </Col>

        <Col span={16}>
          <CafeScrapperPreview
            currentTitles={currentTitles}
            scrappedTitles={scrappedTitles}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CafeScrapper;
