import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Modal,
  Button,
  Row,
  Col,
  Form,
  message,
  Switch,
} from 'antd';
import { useMutation } from '@tanstack/react-query';

import { IScrapper } from 'types';
import api from 'api';
import { IUpdateScrapperBodyProps } from 'api/scrappers';
import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import ScrapperInfo from './ScrapperInfo';
import ScrapperPreview from './ScrapperPreview';

interface IProps {
  id: string;
  scrapper?: IScrapper;
  refetch?: any;
}
const ScrapperDetail: React.FC<IProps> = ({ id, scrapper, refetch }) => {
  const router = useRouter();

  const [form] = Form.useForm();
  const cafeId = Form.useWatch('cafeId', form);
  const themeSelector = Form.useWatch('themeSelector', form);

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentTitles, setCurrentTitles] = useState<string[]>([]);
  const [scrappedTitles, setScrappedTitles] = useState<string[]>([]);

  useEffect(() => {
    if (scrapper) {
      form.setFieldsValue(scrapper);
    }
  }, [scrapper]);

  const { mutate: updateMutate, isLoading: isSubmitting } = useMutation(
    (body: IUpdateScrapperBodyProps) =>
      api.scrappers.updateScrapper({ id, body }),
    {
      onSuccess: () => {
        message.success('성공적으로 저장되었습니다.');
        return router.back();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  const { mutate: statusMutate, isLoading: isStatusSubmitting } = useMutation(
    (isChacked: boolean) =>
      isChacked
        ? api.scrappers.enabledScrapper({ id })
        : api.scrappers.disabledScrapper({ id }),
    {
      onSuccess: () => {
        message.success('성공적으로 상태 변경되었습니다.');
        refetch();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    () => api.scrappers.deleteScrapper({ id }),
    {
      onSuccess: () => {
        message.success('성공적으로 삭제되었습니다.');
        return router.back();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  function handleSubmit(values: any) {
    if (!values.cafeId) {
      message.warning('카페는 필수값입니다.');
      return;
    }
    if (!values.url) {
      message.warning('URL은 필수값입니다.');
      return;
    }
    if (!values.themeSelector) {
      message.warning('테마 셀렉터는 필수값입니다.');
      return;
    }

    updateMutate(values);
  }

  function handleDelete() {
    deleteMutate();
  }

  function handleShowModal() {
    setModalVisible(true);
  }
  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleChangeStatus(checked: boolean) {
    statusMutate(checked);
  }

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
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Box mx="-24px" mb="24px">
          <PageHeader
            title="스크래퍼 상세"
            subTitle={
              <Switch
                checkedChildren="활성화"
                unCheckedChildren="비활성화"
                loading={isStatusSubmitting}
                checked={scrapper?.status === 'PUBLISHED'}
                onChange={handleChangeStatus}
              />
            }
            extra={[
              <Button
                key="save"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                저장
              </Button>,
              scrapper?.status === 'DELETED' && (
                <Button
                  key="delete"
                  type="primary"
                  loading={isDeleting}
                  danger
                  onClick={handleShowModal}
                >
                  삭제
                </Button>
              ),
            ]}
            onBack={() => router.back()}
          />
        </Box>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <ScrapperInfo form={form} onScrap={handleScrap} />
          </Col>

          <Col span={16}>
            <ScrapperPreview
              currentTitles={currentTitles}
              scrappedTitles={scrappedTitles}
            />
          </Col>
        </Row>
      </Form>

      {/* Modals */}
      <Modal
        title="테마 삭제"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={
          <Box flexDirection="row" justifyContent="flex-end">
            <Box mr="8px">
              <Button onClick={handleCloseModal}>취소</Button>
            </Box>
            <Button
              type="primary"
              danger
              loading={isDeleting}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Box>
        }
      >
        <Box flexDirection="row">
          <Typography.Text strong>&apos;해당 스크래퍼&apos;</Typography.Text>
          <Typography.Text>을/를 삭제하시겠습니까?</Typography.Text>
        </Box>
      </Modal>
    </>
  );
};

export default ScrapperDetail;
