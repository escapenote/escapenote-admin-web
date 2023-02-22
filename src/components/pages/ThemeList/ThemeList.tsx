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
} from 'antd';
import dayjs from 'dayjs';

import api from 'api';
import { ICafe, IGenre } from 'types';
import { numberWithComma } from 'utils/common';
import { sorterTooltipNames } from 'utils/locale';
import { Box } from 'components/atoms';
import Section from 'components/templates/Section';
import PageHeader from 'components/molecules/PageHeader';

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
  const cafeId = String(router.query.cafeId ?? '') || undefined;
  const genre = String(router.query.genre ?? '') || undefined;
  const term = String(router.query.term ?? '') || undefined;
  const status = String(router.query.status ?? '');

  const [form] = Form.useForm();

  const { isLoading, data, isRefetching, refetch } = useQuery(
    ['fetchThemes', cafeId, genre, term, status, page, limit, sort, order],
    () =>
      api.themes.fetchThemes({
        cafeId,
        genre,
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

  const { data: cafeList } = useQuery(
    ['fetchCafes', 1, 1000, 'name', 'asc'],
    () =>
      api.cafes.fetchCafes({
        page: 1,
        limit: 1000,
        sort: 'name',
        order: 'asc',
      }),
  );

  const { data: genreList } = useQuery(
    ['fetchGenreList', 1, 1000, 'id', 'asc'],
    () =>
      api.genre.fetchGenreList({
        page: 1,
        limit: 1000,
        sort: 'id',
        order: 'asc',
      }),
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
    form.setFieldsValue({
      cafeId: undefined,
      genre: undefined,
      term: undefined,
      status: '',
    });
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
          initialValues={{ cafeId, genre, term, status }}
          onFinish={handleSubmit}
        >
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Row style={{ flex: 1 }}>
              <Form.Item label="카페" name="cafeId">
                <Select
                  style={{ width: '200px' }}
                  showSearch
                  allowClear
                  placeholder="카페를 선택해주세요"
                  optionFilterProp="label"
                >
                  {cafeList?.items.map(item => (
                    <Select.Option
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="장르" name="genre">
                <Select
                  style={{ width: '200px' }}
                  showSearch
                  allowClear
                  placeholder="장르를 선택해주세요"
                  optionFilterProp="label"
                >
                  {genreList?.items.map(item => (
                    <Select.Option
                      key={item.id}
                      label={item.id}
                      value={item.id}
                    >
                      {item.id}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="테마" name="term">
                <Input placeholder="테마를 입력하세요" />
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
              title: '카페',
              dataIndex: 'cafe',
              width: 120,
              render: (cafe: ICafe) => {
                return (
                  <Link href={`/cafes/${cafe.id}`}>
                    <a>{cafe.name}</a>
                  </Link>
                );
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
              dataIndex: 'displayName',
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'displayName' && { sortOrder: orderedForAntd }),
            },
            {
              title: '장르',
              dataIndex: 'genre',
              render: (genre: IGenre[]) => {
                return genre.map(v => v.id).join(', ');
              },
            },
            {
              title: '금액',
              dataIndex: 'price',
              width: 100,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'price' && { sortOrder: orderedForAntd }),
              render: price => {
                return numberWithComma(price);
              },
            },
            {
              title: '인원수',
              dataIndex: 'minPerson',
              width: 80,
              render: (minPerson, theme) => {
                return `${minPerson} - ${theme.maxPerson}`;
              },
            },
            {
              title: '시간',
              dataIndex: 'during',
              width: 60,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'during' && { sortOrder: orderedForAntd }),
            },
            {
              title: '난이도',
              dataIndex: 'level',
              width: 70,
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
                else return <StopTwoTone twoToneColor="#fa8c16" />;
              },
            },
            {
              title: '생성날짜',
              dataIndex: 'createdAt',
              width: 140,
              sortDirections: ['descend', 'ascend', 'descend'],
              sorter: true,
              ...(sort === 'createdAt' && { sortOrder: orderedForAntd }),
              render: (createdAt: string) =>
                dayjs(createdAt).format('YYYY-MM-DD HH:mm'),
            },
            {
              title: '수정날짜',
              dataIndex: 'updatedAt',
              width: 140,
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
