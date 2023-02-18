import { IOpeningHours } from './common';
import { IScrapper } from './scrapper';
import { ITheme } from './theme';

/**
 * 카페
 */
export interface ICafe {
  id: string;
  naverMapId: string;
  areaA: string;
  areaB: string;
  name: string;
  addressLine: string;
  lat: number;
  lng: number;
  images: string[];
  website: string;
  tel: string;
  openingHours: IOpeningHours[];
  themes: ITheme[];
  scrapper?: IScrapper;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
