import { ICafe } from './cafe';

/**
 * 스크래퍼
 */
export interface IScrapper {
  id: string;
  url: string;
  comment: string;
  cafe?: ICafe;
  cafeId?: string;
  groupSelector: string;
  themeSelector: string;
  themePostProcessing: string;
  branchSelector: string;
  branchPostProcessing: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
