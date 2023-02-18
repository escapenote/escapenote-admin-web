import { ICafe } from './cafe';
import { IGenre } from './genre';

/**
 * 테마
 */
export interface ITheme {
  id: string;
  cafe: ICafe;
  cafeId: string;
  name: string;
  displayName: string;
  intro: string;
  thumbnail: string;
  genre: IGenre[];
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
