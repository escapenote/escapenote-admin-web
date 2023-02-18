import { ICafe } from './cafe';
import { IScrapper } from './scrapper';

/**
 * 지표
 */
export interface IMetric {
  id: string;
  scrapper?: IScrapper;
  scrapperId?: string;
  currentThemes: string[];
  scrappedThemes: string[];
  differentThemes: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
