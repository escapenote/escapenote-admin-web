import { adminApi } from 'api';

/**
 * 이미지 저장
 */
interface IUploadFileRes {
  url: string;
}
export const uploadFile = async (folderName: string, file: File) => {
  const params = { folderName };

  const formData = new FormData();
  formData.append('file', file);

  const { data } = await adminApi.post<IUploadFileRes>('/images', formData, {
    params,
  });
  return data;
};

/**
 * 이미지 삭제
 */
export const deleteFile = async (key: string) => {
  const params = { key };
  const result = await adminApi.delete('/images', { params });
  return result;
};
