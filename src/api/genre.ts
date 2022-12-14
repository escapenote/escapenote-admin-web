import { adminApi } from 'api';
import { ITheme } from 'types';

/**
 * 장르 리스트 조회
 */
interface IFetchGenreListProps {
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchGenreListRes {
  total: number;
  items: ITheme[];
}
export const fetchGenreList = async ({ page, limit }: IFetchGenreListProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;

  const { data } = await adminApi.get<IFetchGenreListRes>('/genre', {
    params,
  });
  return data;
};
