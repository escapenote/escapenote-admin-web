import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { pickBy } from 'lodash';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import {
  PlusOutlined,
  EditOutlined,
  ReloadOutlined,
  CheckCircleTwoTone,
  StopTwoTone,
  PauseCircleTwoTone,
} from '@ant-design/icons';
import {
  Table,
  TablePaginationConfig,
  Form,
  Input,
  Row,
  Tooltip,
  Button,
  Select,
  Tag,
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import { Box } from 'components/atoms';
import Section from 'components/templates/Section';
import PageHeader from 'components/molecules/PageHeader';
import { ITheme } from 'types';

const ThemeList = () => {
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
  const term = String(router.query.term ?? '');
  const status = String(router.query.status ?? '');

  const [form] = Form.useForm();

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchThemes', term, status, page, limit, sort, order],
    () =>
      api.themes.fetchThemes({
        term,
        status,
        page,
        limit,
        sort,
        order,
      }),
    {
      keepPreviousData: true,
    },
  );

  function moveToCreatePage() {
    router.push('/themes/create');
  }

  function handleSubmit(values: any) {
    const query = { ...router.query, ...values, page: 1 };
    const pickQuery = pickBy(
      query,
      v => v !== undefined && v !== null && v !== '',
    );
    router.push({ query: pickQuery });
  }

  function handleReset() {
    form.setFieldsValue({ term: '', cityId: '', status: '' });
    router.push({});
  }

  return (
    <>
      <Box mx="-24px" mb="24px">
        <PageHeader title="테마 리스트" />
      </Box>

      <Section>
        <Form
          form={form}
          layout="inline"
          initialValues={{ term, status }}
          onFinish={handleSubmit}
        >
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Row style={{ flex: 1 }}>
              <Form.Item label="테마명" name="term">
                <Input placeholder="테마를 입력하세요" />
              </Form.Item>
              <Form.Item label="상태" name="status">
                <Select style={{ width: '100px' }}>
                  <Select.Option value="">전체</Select.Option>
                  <Select.Option value="PUBLISHED">배포된</Select.Option>
                  <Select.Option value="PROCESSING">처리중</Select.Option>
                  <Select.Option value="DELETED">삭제된</Select.Option>
                </Select>
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
                  onClick={moveToCreatePage}
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
              title: '이미지',
              dataIndex: 'thumbnail',
              width: 100,
              render: (thumbnail: string) => (
                <img
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + thumbnail}
                  alt="thumbnail"
                  width="120px"
                  height="160px"
                />
              ),
            },
            {
              title: '이름',
              dataIndex: 'name',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'name' && { sortOrder: orderedForAntd }),
            },
            {
              title: '최소 인원수',
              dataIndex: 'minPerson',
              width: 100,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'minPerson' && { sortOrder: orderedForAntd }),
            },
            {
              title: '최대 인원수',
              dataIndex: 'maxPerson',
              width: 100,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'maxPerson' && { sortOrder: orderedForAntd }),
            },
            {
              title: '시간',
              dataIndex: 'during',
              width: 80,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'during' && { sortOrder: orderedForAntd }),
            },
            {
              title: '난이도',
              dataIndex: 'level',
              width: 80,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'level' && { sortOrder: orderedForAntd }),
            },
            {
              title: '상태',
              dataIndex: 'status',
              width: 60,
              align: 'center',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'status' && { sortOrder: orderedForAntd }),
              render: (status: string) => {
                if (status === 'PUBLISHED')
                  return <CheckCircleTwoTone twoToneColor="#52c41a" />;
                if (status === 'PROCESSING')
                  return <PauseCircleTwoTone twoToneColor="#FFC300" />;
                else return <StopTwoTone twoToneColor="#eb2f96" />;
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
              render: (_, theme) => (
                <Box flexDirection="row">
                  <Tooltip title="편집">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => router.push(`/themes/${theme.id}`)}
                    />
                  </Tooltip>
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
    </>
  );
};

export default ThemeList;
