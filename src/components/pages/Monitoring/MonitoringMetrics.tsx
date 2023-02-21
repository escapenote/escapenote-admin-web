import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { pickBy } from 'lodash';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import {
  CheckOutlined,
  ReloadOutlined,
  CheckCircleTwoTone,
  WarningTwoTone,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import {
  Table,
  TablePaginationConfig,
  Form,
  Row,
  Tooltip,
  Button,
  Select,
  message,
  Typography,
  Empty,
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { IScrapper } from 'types';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import Section from 'components/templates/Section';
import { Box } from 'components/atoms';

const MonitoringMetrics = () => {
  const router = useRouter();

  /**
   * 정렬
   */
  const page = Number(router.query.page ?? 1);
  const limit = Number(router.query.limit ?? 20);
  const sort = String(router.query.sort ?? 'status');
  const order = String(router.query.order ?? 'asc');
  const orderedForAntd = order === 'asc' ? 'ascend' : 'descend';

  /**
   * 필터
   */
  const status = String(router.query.status ?? '');

  const [form] = Form.useForm();

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchMetrics', status, page, limit, sort, order],
    () =>
      api.metrics.fetchMetrics({
        status,
        page,
        limit,
        sort,
        order,
      }),
    {
      retry: 0,
    },
  );

  const { mutate: scrapMutate, isLoading: isScrapping } = useMutation(
    () => api.metrics.scrapAll(),
    {
      onSuccess: () => {
        message.info('전체 스크랩을 시작하였습니다. 대략 1분정도 소요됩니다.');
        refetch();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  const { mutate: statusMutate } = useMutation(
    (data: { id: string }) => api.metrics.changeMetricStatus(data),
    {
      onSuccess: () => {
        message.success('성공적으로 상태가 변경되었습니다.');
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
    form.setFieldsValue({ status: '' });
    router.push({});
  }

  function handleScrap() {
    scrapMutate();
  }

  function handleChangeStatus(id: string) {
    statusMutate({ id });
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
                <Select style={{ width: '110px' }}>
                  <Select.Option value="">전체</Select.Option>
                  <Select.Option value="SOMETHING_WRONG">
                    <WarningTwoTone twoToneColor="#eb2f96" /> 문제있음
                  </Select.Option>
                  <Select.Option value="NOTHING_WRONG">
                    <CheckCircleTwoTone twoToneColor="#52c41a" /> 이상없음
                  </Select.Option>
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
          locale={{
            ...sorterTooltipNames,
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ color: 'black' }}
                description={
                  <p>
                    스크랩 중입니다.
                    <br />
                    <Typography.Text type="danger">
                      대략 1분정도
                    </Typography.Text>
                    소요됩니다.
                  </p>
                }
              />
            ),
          }}
          size="middle"
          rowKey="id"
          loading={isLoading || isRefetching || isScrapping}
          dataSource={data?.items}
          title={() => (
            <Box flexDirection="row" justifyContent="space-between">
              <Box />
              <Box flexDirection="row" gridGap="8px">
                <Button
                  type="primary"
                  icon={<CloudDownloadOutlined />}
                  loading={isScrapping}
                  onClick={handleScrap}
                >
                  테마 전체 스크랩
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
              dataIndex: 'scrapper',
              width: 200,
              render: (scrapper?: IScrapper) => {
                return (
                  <Link href={`/cafes/${scrapper?.cafe?.id}`}>
                    <a>{scrapper?.cafe?.name}</a>
                  </Link>
                );
              },
            },
            {
              title: '현재 테마',
              dataIndex: 'currentThemes',
              render: (currentThemes: string[]) => {
                return currentThemes.join(', ');
              },
            },
            {
              title: '스크랩 테마',
              dataIndex: 'scrappedThemes',
              render: (scrappedThemes: string[]) => {
                return scrappedThemes.join(', ');
              },
            },
            {
              title: '차이점',
              dataIndex: 'differentThemes',
              render: (differentThemes: string[]) => {
                return differentThemes.join(', ');
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
                if (status === 'NOTHING_WRONG')
                  return <CheckCircleTwoTone twoToneColor="#52c41a" />;
                else return <WarningTwoTone twoToneColor="#eb2f96" />;
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
              key: 'operation',
              width: 100,
              render: (_, scrapper) => (
                <Box flexDirection="row">
                  <Tooltip title="확인">
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      onClick={() => handleChangeStatus(scrapper.id)}
                    />
                  </Tooltip>
                </Box>
              ),
            },
          ]}
          expandable={{
            expandedRowRender: record => (
              <>
                <Box mb="5px">
                  <Typography.Text strong>
                    현재 테마 ({record.currentThemes.length})
                  </Typography.Text>
                  <pre>[{record.currentThemes.join(', ')}]</pre>
                </Box>
                <Box mb="5px">
                  <Typography.Text strong>
                    스크랩 테마 ({record.scrappedThemes.length})
                  </Typography.Text>
                  <pre>[{record.scrappedThemes.join(', ')}]</pre>
                </Box>
                <Box mb="5px">
                  <Typography.Text type="danger" strong>
                    차이점 ({record.differentThemes.length})
                  </Typography.Text>
                  <pre>[{record.differentThemes.join(', ')}]</pre>
                </Box>
              </>
            ),
          }}
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

export default MonitoringMetrics;
