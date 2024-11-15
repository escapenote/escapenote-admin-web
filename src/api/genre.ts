import { adminApi } from 'api';
import { IGenre } from 'types';

/**
 * 장르 리스트 조회
 */
interface IFetchGenreListProps {
  term?: string;
  includeThemes?: boolean;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchGenreListRes {
  total: number;
  items: IGenre[];
}
export const fetchGenreList = async ({
  term,
  includeThemes,
  page,
  limit,
  sort,
  order,
}: IFetchGenreListProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;
  if (term) params.term = term;
  if (includeThemes) params.includeThemes = includeThemes;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await adminApi.get<IFetchGenreListRes>('/genre', {
    params,
  });
  return data;
};

/**
 * 장르 추가
 */
export interface ICreateGenreBodyProps {
  id: string;
}
interface ICreateGenreProps {
  body: ICreateGenreBodyProps;
}
export const createGenre = async ({ body }: ICreateGenreProps) => {
  const { data } = await adminApi.post('/genre', body);
  return data;
};

/**
 * 장르 삭제
 */
export interface IDeleteGenreProps {
  id: string;
}
export const deleteGenre = async ({ id }: IDeleteGenreProps) => {
  const { data } = await adminApi.delete(`/genre/${id}`);
  return data;
};
