import { ICafe } from './cafe';
import { IMetric } from './metric';

/**
 * 스크래퍼
 */
export interface IScrapper {
  id: string;
  url: string;
  comment: string;
  cafe?: ICafe;
  cafeId?: string;
  metric?: IMetric;
  groupSelector: string;
  themeSelector: string;
  themePostProcessing: string;
  branchSelector: string;
  branchPostProcessing: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
