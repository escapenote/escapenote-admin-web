import { adminApi } from 'api';
import { IMetric } from 'types';

/**
 * 모니터링 리스트 조회
 */
interface IFetchMetricsProps {
  status?: string;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchMetricsRes {
  total: number;
  items: IMetric[];
}
export const fetchMetrics = async ({
  status,
  page,
  limit,
  sort,
  order,
}: IFetchMetricsProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await adminApi.get<IFetchMetricsRes>('/metrics', {
    params,
  });
  return data;
};

/**
 * 메트릭 상세 조회
 */
interface IFetchMetricProps {
  id: string;
}
export const fetchMetric = async ({ id }: IFetchMetricProps) => {
  const { data } = await adminApi.get<IMetric>(`/metrics/${id}`);
  return data;
};

/**
 * 스크래퍼 이상없음으로 상태 변경
 */
interface IChangeMetricStatusProps {
  id: string;
}
export const changeMetricStatus = async ({ id }: IChangeMetricStatusProps) => {
  const { data } = await adminApi.patch(`/metrics/${id}/status`);
  return data;
};

/**
 * 스크래퍼 전체 데이터를 이용하여 스크랩
 */
export const scrapAll = async () => {
  const { data } = await adminApi.post<boolean>('/metrics');
  return data;
};
