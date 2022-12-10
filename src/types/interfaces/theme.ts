import { ICafe } from './cafe';

/**
 * 테마
 */
export interface ITheme {
  id: string;
  cafe: ICafe;
  cafeId: string;
  name: string;
  intro: string;
  thumbnail: string;
  genre: string;
  price: number;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  lockingRatio: number;
  detailUrl: string;
  reservationUrl: string;
  openDate: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
