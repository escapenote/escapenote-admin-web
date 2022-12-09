import { ITheme } from './theme';

/**
 * 카페
 */
export interface ICafe {
  id: string;
  areaA: string;
  areaB: string;
  name: string;
  addressLine: string;
  lat: number;
  lng: number;
  images: string[];
  website: string;
  tel: string;
  openingHour: number;
  closingHour: number;
  since: string;
  themes: ITheme[];
  themesCount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
