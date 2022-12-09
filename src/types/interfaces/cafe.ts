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
  tel: string;
  openingHour: number;
  closingHour: number;
  url: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
