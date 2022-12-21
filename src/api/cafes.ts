import { adminApi } from 'api';
import { ICafe } from 'types';

/**
 * 카페 리스트 조회
 */
interface IFetchCafesProps {
  term?: string;
  areaA?: string;
  areaB?: string;
  status?: string;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchCafesRes {
  total: number;
  items: ICafe[];
}
export const fetchCafes = async ({
  term,
  areaA,
  areaB,
  status,
  page,
  limit,
  sort,
  order,
}: IFetchCafesProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;
  if (term) params.term = term;
  if (areaA) params.areaA = areaA;
  if (areaB) params.areaB = areaB;
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await adminApi.get<IFetchCafesRes>('/cafes', {
    params,
  });
  return data;
};

/**
 * 카페 상세 조회
 */
interface IFetchCafeProps {
  id: string;
}
export const fetchCafe = async ({ id }: IFetchCafeProps) => {
  const { data } = await adminApi.get<ICafe>(`/cafes/${id}`);
  return data;
};

/**
 * 카페 추가
 */
export interface ICreateCafeBodyProps {
  areaA: string;
  areaB: string;
  name: string;
  intro?: string;
  addressLine: string;
  lat?: number;
  lng?: number;
  images?: string[];
  website?: string;
  tel?: string;
  openingHours?: any;
}
interface ICreateCafeProps {
  body: ICreateCafeBodyProps;
}
export const createCafe = async ({ body }: ICreateCafeProps) => {
  const { data } = await adminApi.post('/cafes', body);
  return data;
};

/**
 * 카페 수정
 */
export interface IUpdateCafeBodyProps {
  areaA: string;
  areaB: string;
  name: string;
  intro?: string;
  addressLine: string;
  lat?: number;
  lng?: number;
  images?: string[];
  website?: string;
  tel?: string;
  openingHours?: any;
  status: string;
}
interface IUpdateCafeProps {
  id: string;
  body: IUpdateCafeBodyProps;
}
export const updateCafe = async ({ id, body }: IUpdateCafeProps) => {
  const { data } = await adminApi.patch(`/cafes/${id}`, body);
  return data;
};

/**
 * 카페 삭제
 */
interface IDeleteCafeProps {
  id: string;
}
export const deleteCafe = async ({ id }: IDeleteCafeProps) => {
  const { data } = await adminApi.delete(`/cafes/${id}`);
  return data;
};
