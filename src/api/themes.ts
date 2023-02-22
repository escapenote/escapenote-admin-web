import { adminApi } from 'api';
import { ITheme } from 'types';

/**
 * 테마 리스트 조회
 */
interface IFetchThemesProps {
  cafeId?: string;
  genre?: string;
  term?: string;
  status?: string;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchThemesRes {
  total: number;
  items: ITheme[];
}
export const fetchThemes = async ({
  cafeId,
  genre,
  term,
  status,
  page,
  limit,
  sort,
  order,
}: IFetchThemesProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;
  if (cafeId) params.cafeId = cafeId;
  if (genre) params.genre = genre;
  if (term) params.term = term;
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await adminApi.get<IFetchThemesRes>('/themes', {
    params,
  });
  return data;
};

/**
 * 테마 상세 조회
 */
interface IFetchThemeProps {
  id: string;
}
export const fetchTheme = async ({ id }: IFetchThemeProps) => {
  const { data } = await adminApi.get<ITheme>(`/themes/${id}`);
  return data;
};

/**
 * 테마 추가
 */
export interface ICreateThemeBodyProps {
  cafeId: string;
  name: string;
  displayName: string;
  intro: string;
  thumbnail: string;
  genre: string[];
  price: number;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  lockingRatio?: number;
  fear?: number;
  activity?: number;
  openDate?: string;
  detailUrl?: string;
  reservationUrl?: string;
  status: string;
}
interface ICreateThemeProps {
  body: ICreateThemeBodyProps;
}
export const createTheme = async ({ body }: ICreateThemeProps) => {
  const { data } = await adminApi.post('/themes', body);
  return data;
};

/**
 * 테마 수정
 */
export interface IUpdateThemeBodyProps {
  cafeId: string;
  name: string;
  displayName: string;
  intro: string;
  thumbnail: string;
  genre: string[];
  price: number;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  lockingRatio?: number;
  fear?: number;
  activity?: number;
  openDate?: string;
  detailUrl?: string;
  reservationUrl?: string;
  status: string;
}
interface IUpdateThemeProps {
  id: string;
  body: IUpdateThemeBodyProps;
}
export const updateTheme = async ({ id, body }: IUpdateThemeProps) => {
  const { data } = await adminApi.patch(`/themes/${id}`, body);
  return data;
};

/**
 * 테마 활성화
 */
interface IEnabledThemeProps {
  id: string;
}
export const enabledTheme = async ({ id }: IEnabledThemeProps) => {
  const { data } = await adminApi.patch(`/themes/${id}/enabled`);
  return data;
};

/**
 * 테마 비활성화
 */
interface IDisabledThemeProps {
  id: string;
}
export const disabledTheme = async ({ id }: IDisabledThemeProps) => {
  const { data } = await adminApi.patch(`/themes/${id}/disabled`);
  return data;
};

/**
 * 테마 삭제
 */
interface IDeleteThemeProps {
  id: string;
}
export const deleteTheme = async ({ id }: IDeleteThemeProps) => {
  const { data } = await adminApi.delete(`/themes/${id}`);
  return data;
};
