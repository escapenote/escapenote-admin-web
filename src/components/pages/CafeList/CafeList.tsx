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
  Input,
  Row,
  Tooltip,
  Button,
  Select,
  Tag,
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { ICafe, ITheme } from 'types';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import { useAppSelector } from 'store';
import { Box } from 'components/atoms';
import Section from 'components/templates/Section';
import PageHeader from 'components/molecules/PageHeader';

const CafeList = () => {
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
  const areaA = String(router.query.areaA ?? '');
  const areaB = String(router.query.areaB ?? '');
  const status = String(router.query.status ?? '');

  const [form] = Form.useForm();
  const location = useAppSelector(state => state.data.location);
  const _areaA = Form.useWatch('areaA', form);
  const areaAData = Object.keys(location);
  const areaBData = _areaA ? location[_areaA] : [];

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchCafes', term, areaA, areaB, status, page, limit, sort, order],
    () =>
      api.cafes.fetchCafes({
        term,
        areaA,
        areaB,
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
    router.push('/cafes/create');
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
    form.setFieldsValue({ term: '', areaA: '', areaB: '', status: '' });
    router.push({});
  }

  return (
    <>
      <Box mx="-24px" mb="24px">
        <PageHeader title="카페 리스트" />
      </Box>

      <Section>
        <Form
          form={form}
          layout="inline"
          initialValues={{ term, areaA, areaB, status }}
          onFinish={handleSubmit}
        >
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Row style={{ flex: 1 }}>
              <Form.Item label="지역 대분류" name="areaA">
                <Select style={{ width: '100px' }}>
                  <Select.Option value="">전체</Select.Option>
                  {areaAData?.map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="지역 소분류" name="areaB">
                <Select style={{ width: '100px' }}>
                  <Select.Option value="">전체</Select.Option>
                  {areaBData?.map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="카페명" name="term">
                <Input placeholder="카페를 입력하세요" />
              </Form.Item>
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
              title: '지역 대분류',
              dataIndex: 'areaA',
              width: 120,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'areaA' && { sortOrder: orderedForAntd }),
            },
            {
              title: '지역 소분류',
              dataIndex: 'areaB',
              width: 120,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'areaB' && { sortOrder: orderedForAntd }),
            },
            {
              title: '이름',
              dataIndex: 'name',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'name' && { sortOrder: orderedForAntd }),
            },
            {
              title: '테마 수',
              dataIndex: 'themes',
              width: 80,
              align: 'center',
              render: (themes: ITheme[], cafe: ICafe) => {
                return (
                  <Link href={`/cafes/${cafe.id}?tab=themes`}>
                    <a>
                      <Tag color="orange">테마: {themes.length}</Tag>
                    </a>
                  </Link>
                );
              },
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
              render: (_, cafe) => (
                <Box flexDirection="row">
                  <Tooltip title="편집">
                    <Button
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => router.push(`/cafes/${cafe.id}`)}
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

export default CafeList;
