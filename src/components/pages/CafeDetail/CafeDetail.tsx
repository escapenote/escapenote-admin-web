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
  Tabs,
  Switch,
} from 'antd';
import { useMutation } from '@tanstack/react-query';
import { PlusOutlined } from '@ant-design/icons';

import { ICafe } from 'types';
import api from 'api';
import { IUpdateCafeBodyProps } from 'api/cafes';
import PageHeader from 'components/molecules/PageHeader';
import { Box } from 'components/atoms';
import CafeScrap from './CafeScrap';
import CafeInfo from './CafeInfo';
import CafeLocation from './CafeLocation';
import CafeImage from './CafeImage';
import CafeThemes from './CafeThemes';

interface IProps {
  id: string;
  cafe?: ICafe;
  refetch?: any;
}
const CafeDetail: React.FC<IProps> = ({ id, cafe, refetch }) => {
  const router = useRouter();

  const tab = String(router.query.tab ?? 'info');

  const [form] = Form.useForm();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (cafe) {
      form.setFieldsValue({
        ...cafe,
        openingHours: JSON.stringify(cafe.openingHours),
      });
    }
    return () => {
      handleValuesReset();
    };
  }, [cafe]);

  const { mutate: updateMutate, isLoading: isSubmitting } = useMutation(
    (body: IUpdateCafeBodyProps) => api.cafes.updateCafe({ id, body }),
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
        ? api.cafes.enabledCafe({ id })
        : api.cafes.disabledCafe({ id }),
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
    () => api.cafes.deleteCafe({ id }),
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

  function handleValuesReset() {
    form.setFieldsValue({
      naverMapId: undefined,
      areaA: undefined,
      areaB: undefined,
      name: undefined,
      addressLine: undefined,
      lat: undefined,
      lng: undefined,
      images: undefined,
      website: undefined,
      tel: undefined,
      openingHours: undefined,
      status: undefined,
    });
  }

  function handleSubmit(values: any) {
    if (!values.areaA) {
      message.warning('지역 대분류는 필수값입니다.');
      return;
    }
    if (!values.areaB) {
      message.warning('지역 소분류는 필수값입니다.');
      return;
    }
    if (!values.name) {
      message.warning('이름은 필수값입니다.');
      return;
    }
    if (!values.addressLine) {
      message.warning('주소는 필수값입니다.');
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

  function handleChangeTab(activeTab: string) {
    router.replace({ query: { ...router.query, tab: activeTab } });
  }

  function moveToCreatePage() {
    router.push(`/themes/create?cafeId=${id}`);
  }

  function handleChangeStatus(checked: boolean) {
    statusMutate(checked);
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Box mx="-24px" mb="24px">
          <PageHeader
            title="카페 상세"
            subTitle={
              <Switch
                checkedChildren="활성화"
                unCheckedChildren="비활성화"
                loading={isStatusSubmitting}
                checked={cafe?.status === 'PUBLISHED'}
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
              cafe?.status === 'DELETED' && (
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
            footer={
              <Tabs activeKey={tab} onChange={handleChangeTab}>
                <Tabs.TabPane key="info" tab="카페 정보" />
                <Tabs.TabPane
                  key="themes"
                  tab={`테마 리스트 (${cafe?.themes.length ?? 0})`}
                />
              </Tabs>
            }
          />
        </Box>

        {tab === 'info' ? (
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <CafeScrap form={form} />
              <CafeInfo />
            </Col>

            <Col span={16}>
              <CafeImage form={form} cafe={cafe} />
              <CafeLocation form={form} />
            </Col>
          </Row>
        ) : (
          <>
            <Box flexDirection="row" justifyContent="space-between" mb="12px">
              <Box />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={moveToCreatePage}
              >
                추가
              </Button>
            </Box>
            <CafeThemes id={id} />
          </>
        )}
      </Form>

      {/* Modals */}
      <Modal
        title="카페 삭제"
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
          <Typography.Text strong>&apos;{cafe?.name}&apos;</Typography.Text>
          <Typography.Text>을/를 삭제하시겠습니까?</Typography.Text>
        </Box>
      </Modal>
    </>
  );
};

export default CafeDetail;
