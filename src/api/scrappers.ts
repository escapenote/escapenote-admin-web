import { adminApi } from 'api';
import { IScrapper } from 'types';

/**
 * 스크래퍼 리스트 조회
 */
interface IFetchScrappersProps {
  status?: string;
  page: number;
  limit: number;
  sort?: string;
  order?: string;
}
interface IFetchScrappersRes {
  total: number;
  items: IScrapper[];
}
export const fetchScrappers = async ({
  status,
  page,
  limit,
  sort,
  order,
}: IFetchScrappersProps) => {
  const params = {
    skip: (page - 1) * limit,
    take: limit,
  } as any;
  if (status) params.status = status;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const { data } = await adminApi.get<IFetchScrappersRes>('/scrappers', {
    params,
  });
  return data;
};

/**
 * 스크래퍼 상세 조회
 */
interface IFetchScrapperProps {
  id: string;
}
export const fetchScrapper = async ({ id }: IFetchScrapperProps) => {
  const { data } = await adminApi.get<IScrapper>(`/scrappers/${id}`);
  return data;
};

/**
 * 스크래퍼 수정
 */
export interface IUpdateScrapperBodyProps {
  id: string;
  cafeId: string;
  url: string;
  comment?: string;
  groupSelector?: string;
  themeSelector: string;
  branchSelector?: string;
}
interface IUpdateScrapperProps {
  id: string;
  body: IUpdateScrapperBodyProps;
}
export const updateScrapper = async ({ id, body }: IUpdateScrapperProps) => {
  const { data } = await adminApi.patch(`/scrappers/${id}`, body);
  return data;
};

/**
 * 스크래퍼 활성화
 */
interface IEnabledScrapperProps {
  id: string;
}
export const enabledScrapper = async ({ id }: IEnabledScrapperProps) => {
  const { data } = await adminApi.patch(`/scrappers/${id}/enabled`);
  return data;
};

/**
 * 스크래퍼 비활성화
 */
interface IDisabledScrapperProps {
  id: string;
}
export const disabledScrapper = async ({ id }: IDisabledScrapperProps) => {
  const { data } = await adminApi.patch(`/scrappers/${id}/disabled`);
  return data;
};

/**
 * 스크래퍼 삭제
 */
interface IDeleteScrapperProps {
  id: string;
}
export const deleteScrapper = async ({ id }: IDeleteScrapperProps) => {
  const { data } = await adminApi.delete(`/scrappers/${id}`);
  return data;
};

/**
 * 스크래퍼 데이터를 이용하여 스크랩 시도
 */
interface IFetchScrapperTryScrapProps {
  id: string;
}
interface IFetchScrapperTryScrapRes {
  currentTitles: string[];
  scrappedTitles: string[];
}
export const fetchScrapperTryScrap = async ({
  id,
}: IFetchScrapperTryScrapProps) => {
  const { data } = await adminApi.get<IFetchScrapperTryScrapRes>(
    `/scrappers/${id}/scrap`,
  );
  return data;
};
