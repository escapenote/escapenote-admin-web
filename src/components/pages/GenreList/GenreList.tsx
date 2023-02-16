import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { pickBy } from 'lodash';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Table,
  TablePaginationConfig,
  Form,
  Row,
  Tooltip,
  Button,
  Tag,
  message,
  Input,
  Modal,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import { Box } from 'components/atoms';
import Section from 'components/templates/Section';
import PageHeader from 'components/molecules/PageHeader';
import GenreCreate from './GenreCreate';

const GenreList = () => {
  const router = useRouter();

  /**
   * 정렬
   */
  const page = Number(router.query.page ?? 1);
  const limit = Number(router.query.limit ?? 20);
  const sort = String(router.query.sort ?? 'createdAt');
  const order = String(router.query.order ?? 'desc');
  const orderedForAntd = order === 'asc' ? 'ascend' : 'descend';

  /**
   * 필터
   */
  const term = String(router.query.term ?? '') || undefined;
  const includeThemes = true;

  const [form] = Form.useForm();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteGenreId, setDeleteGenreId] = useState('');

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchGenreList', term, includeThemes, page, limit, sort, order],
    () =>
      api.genre.fetchGenreList({
        term,
        includeThemes,
        page,
        limit,
        sort,
        order,
      }),
    {
      keepPreviousData: true,
    },
  );

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    ({ id }: { id: string }) => api.genre.deleteGenre({ id }),
    {
      onSuccess: () => {
        message.success('성공적으로 삭제되었습니다.');
        refetch();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  function handleSubmit(values: any) {
    const query = { ...router.query, ...values, page: 1 };
    const pickQuery = pickBy(
      query,
      v => v !== undefined && v !== null && v !== '',
    );
    router.push({ query: pickQuery });
  }

  function handleReset() {
    form.setFieldsValue({ term: undefined });
    router.push({});
  }

  function handleDelete() {
    deleteMutate({ id: deleteGenreId });
    handleHideDeleteModal();
  }

  function handleShowCreateModal() {
    setShowCreateModal(true);
  }
  function handleHideCreateModal() {
    setShowCreateModal(false);
  }
  function handleCallbackCreateModal() {
    setShowCreateModal(false);
    refetch();
  }

  function handleShowDeleteModal(genreId: string) {
    setDeleteGenreId(genreId);
    setShowDeleteModal(true);
  }
  function handleHideDeleteModal() {
    setDeleteGenreId('');
    setShowDeleteModal(false);
  }

  return (
    <>
      <Box mx="-24px" mb="24px">
        <PageHeader title="장르 리스트" />
      </Box>

      <Section>
        <Form
          form={form}
          layout="inline"
          initialValues={{ term }}
          onFinish={handleSubmit}
        >
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Row style={{ flex: 1 }}>
              <Form.Item label="장르" name="term">
                <Input placeholder="장르를 입력하세요" />
              </Form.Item>
            </Row>
            <Row>
              <Button
                style={{ marginRight: '8px' }}
                htmlType="button"
                onClick={handleReset}
              >
                리셋
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading || isRefetching}
              >
                조회
              </Button>
            </Row>
          </Box>
        </Form>
      </Section>

      <Section>
        <Table
          locale={sorterTooltipNames}
          size="middle"
          rowKey="id"
          loading={isLoading || isRefetching}
          dataSource={data?.items}
          title={() => (
            <Box flexDirection="row" justifyContent="space-between">
              <Box />
              <Box flexDirection="row" gridGap="8px">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleShowCreateModal}
                >
                  추가
                </Button>
                <Tooltip title="Refresh">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<ReloadOutlined />}
                    onClick={() => refetch()}
                  />
                </Tooltip>
              </Box>
            </Box>
          )}
          columns={[
            {
              title: 'No.',
              width: 60,
              render: (_: any, _item: any, index: number) => {
                return `${(page - 1) * limit + index + 1}.`;
              },
            },
            {
              title: '장르',
              dataIndex: 'id',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'id' && { sortOrder: orderedForAntd }),
            },
            {
              title: '테마 수',
              dataIndex: 'themes',
              width: 80,
              align: 'center',
              render: (themes: ITheme[]) => {
                return <Tag color="orange">테마: {themes.length}</Tag>;
              },
            },
            {
              title: '생성날짜',
              dataIndex: 'createdAt',
              width: 160,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'createdAt' && { sortOrder: orderedForAntd }),
              render: (createdAt: string) =>
                dayjs(createdAt).format('YYYY-MM-DD HH:mm'),
            },
            {
              title: '수정날짜',
              dataIndex: 'updatedAt',
              width: 160,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'updatedAt' && { sortOrder: orderedForAntd }),
              render: (updatedAt: string) =>
                dayjs(updatedAt).format('YYYY-MM-DD HH:mm'),
            },
            {
              key: 'operation',
              width: 100,
              render: (_, genre) => (
                <Box flexDirection="row">
                  <Button
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => handleShowDeleteModal(genre.id)}
                  />
                </Box>
              ),
            },
          ]}
          pagination={{
            size: 'default',
            current: page,
            pageSize: limit,
            total: data?.total,
            showSizeChanger: true,
            showTotal: total => `Total ${numberWithComma(total)} items`,
          }}
          onChange={(
            pagination: TablePaginationConfig,
            _filters: Record<string, FilterValue | null>,
            sorter: SorterResult<any> | any,
          ) => {
            const { current, pageSize } = pagination;
            const { field, order: orderedForAntd } = sorter;
            const order = orderedForAntd === 'ascend' ? 'asc' : 'desc';

            router.push({
              query: {
                ...router.query,
                page: current,
                limit: pageSize,
                sort: field,
                order: order,
              },
            });
          }}
        />
      </Section>

      <GenreCreate
        visible={showCreateModal}
        onCancel={handleHideCreateModal}
        onCallback={handleCallbackCreateModal}
      />

      {/* Modals */}
      <Modal
        title="장르 삭제"
        visible={showDeleteModal}
        onCancel={handleHideDeleteModal}
        footer={
          <Box flexDirection="row" justifyContent="flex-end">
            <Box mr="8px">
              <Button onClick={handleHideDeleteModal}>취소</Button>
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
          <Typography.Text strong>&apos;{deleteGenreId}&apos;</Typography.Text>
          <Typography.Text>을/를 삭제하시겠습니까?</Typography.Text>
        </Box>
        <Box>
          <Typography.Text type="danger" strong>
            (테마가 있는 경우 모두 연결 해제 됩니다.)
          </Typography.Text>
        </Box>
      </Modal>
    </>
  );
};

export default GenreList;
