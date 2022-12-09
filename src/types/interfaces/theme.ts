import { ICafe } from './cafe';

/**
 * 테마
 */
export interface ITheme {
  id: string;
  cafe: ICafe
  cafeId: string;
  name: string;
  intro: string;
  thumbnail: string;
  during: number;
  minPerson: number;
  maxPerson: number;
  level: number;
  detailUrl: string;
  reservationUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
