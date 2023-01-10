import { staticApi } from 'api';

/**
 * 공통 데이터 조회
 */
export const fetchCommon = async () => {
  const data = await staticApi.get('data/main.json');
  return data;
};
