import React from 'react';
import Link from 'next/link';
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
} from '@ant-design/icons';
import {
  Table,
  TablePaginationConfig,
  Form,
  Row,
  Tooltip,
  Button,
  Select,
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { ICafe } from 'types';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const MonitoringScrappers = () => {
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
  const status = String(router.query.status ?? '');

  const [form] = Form.useForm();

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchScrappers', status, page, limit, sort, order],
    () =>
      api.scrappers.fetchScrappers({
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
    router.push('/scrappers/create');
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
    form.setFieldsValue({ status: '' });
    router.push({});
  }

  return (
    <>
      <Section>
        <Form
          form={form}
          layout="inline"
          initialValues={{ status }}
          onFinish={handleSubmit}
        >
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Row style={{ flex: 1 }}>
              <Form.Item label="상태" name="status">
                <Select style={{ width: '100px' }}>
                  <Select.Option value="">전체</Select.Option>
                  <Select.Option value="PUBLISHED">활성화</Select.Option>
                  <Select.Option value="DELETED">비활성화</Select.Option>
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
              title: '카페',
              dataIndex: 'cafe',
              width: 200,
              render: (cafe?: ICafe) => {
                return (
                  cafe && (
                    <Link href={`/cafes/${cafe.id}`}>
                      <a>{cafe.name}</a>
                    </Link>
                  )
                );
              },
            },
            {
              title: 'URL',
              dataIndex: 'url',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'url' && { sortOrder: orderedForAntd }),
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
                else return <StopTwoTone twoToneColor="#fa8c16" />;
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
              render: (_, scrapper) => (
                <Box flexDirection="row">
                  <Tooltip title="편집">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => router.push(`/scrappers/${scrapper.id}`)}
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

export default MonitoringScrappers;
